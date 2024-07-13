package com.br.internalrecruitment.security.jwt;

import com.br.internalrecruitment.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${projeto.jwtSecret}")
    private String jwtSecret;

    @Value("${projeto.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String gerarTokenFromUserDetailsImpl(UserDetailsImpl userDetails) {
        return Jwts.builder()
//                .subject()
                .setSubject(userDetails.getUsername())
//                .issuedAt()
                .setIssuedAt(new Date())
//                .expiration()
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
//                .signWith()
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }


    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtToken(String authToken) {
        try {
//            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            Jwts.parser().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Token JWT inválido: {} " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("O token JWT expirou:: {} " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("O token JWT não é compatível: {} " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT a string de reivindicações está vazia: {} " + e.getMessage());
        }

        return false;
    }

    public Key getSigninKey() {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        return key;
    }

    public String getUsernameToken(String token) {
        return Jwts.parser().setSigningKey(getSigninKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }
}
