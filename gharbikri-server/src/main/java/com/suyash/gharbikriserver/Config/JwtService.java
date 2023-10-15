package com.suyash.gharbikriserver.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * This class will provide the methods to generate and extract the jwt token
 * It is annotated with @Service so that spring can create an instance of this class and store it in the container
 * this class is using the io.jsonwebtoken library to generate and extract the jwt token
 */
@Service
public class JwtService {

    /**
     * secret key used to generate the jwt token
     */
    private static final String SECRET_KEY = "XBnYXersr/KFz8/cmdM5pdEUFYix1HRcuBYgDd7HPg6ZLQfz3a9Ni6h0eYq3yR4W";

    /**
     * this method will extract the email from the jwt token
     *
     * @param jwtToken
     * @return email
     */
    public String extractEmail(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    /**
     * this method will extract specific claim from the jwt token
     *
     * @param jwtToken
     * @param claimsResolver
     * @param <T>
     * @return specific claim
     */
    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    /**
     * this method will generate the token without any extra claims
     *
     * @param userDetails
     * @return jwt token
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * this method will generate the token with extra claims
     *
     * @param extraClaims
     * @param userDetails
     * @return jwt token
     */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact(); // this method will generate the token and return it
    }

    /**
     * this method will validate a jwt token
     *
     * @param jwtToken
     * @param userDetails
     * @return true if the token is valid else false
     */
    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        // check if the email in the token is same as the email in the userDetails and the token is not expired
        final String email = extractEmail(jwtToken);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }

    /**
     * this method will check if the token is expired or not
     *
     * @param jwtToken
     * @return true if the token is expired else false
     */
    private boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }

    /**
     * this method will extract the expiration date from the jwt token
     *
     * @param jwtToken
     * @return expiration date
     */
    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    /**
     * this method will extract all the claims from the jwt token
     *
     * @param jwtToken
     * @return all the claims
     */
    private Claims extractAllClaims(String jwtToken) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();

    }

    /**
     * this method will return the signing key for the jwt token
     *
     * @return signing key
     */
    private Key getSigningKey() {
        byte[] secretBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(secretBytes);
    }
}
