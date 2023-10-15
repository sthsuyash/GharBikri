package com.suyash.gharbikriserver.Auth;

import com.suyash.gharbikriserver.Config.JwtService;
import com.suyash.gharbikriserver.Model.Role;
import com.suyash.gharbikriserver.Model.User;
import com.suyash.gharbikriserver.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for authentication
 * Contains methods for registering and authenticating users
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Register a new user
     *
     * @param registerRequest
     * @return AuthenticationResponse
     */
    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .first_name(registerRequest.getFirst_name())
                .last_name(registerRequest.getLast_name())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Authenticate an existing user and return a JWT token
     *
     * @param authenticationRequest
     * @return AuthenticationResponse
     */
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );

        // If authentication is successful, generate a JWT token and return it
        var user = userRepository
                .findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Generate JWT token
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
