package com.suyash.gharbikriserver.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * this method will be called by the spring security for every request that comes to the server and it will check if the request contains the jwt token or not
     *
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String email;

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwtToken = authorizationHeader.substring(7);
        email = jwtService.extractEmail(jwtToken); // extract email from jwt token

        // if we have username and the user is not authenticated
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // we will load the user details from the database
            final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            // check if the user is valid or not
            // if the user and token is valid, create object of type UsernamePasswordAuthenticationToken
            if (jwtService.isTokenValid(jwtToken, userDetails)) {
                final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails
                        (new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                // update the authentication token
                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }
        }
        // forward the request to the next filter
        filterChain.doFilter(request, response);
    }
}
