package com.example.tourcrud.security;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Component;
import java.util.Date; import java.security.Key; import java.util.Map;
@Component public class JwtUtil {
  private final Key key; private final long exp;
  public JwtUtil(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expirationMillis}") long exp){
    this.key = Keys.hmacShaKeyFor(secret.getBytes()); this.exp = exp;
  }
  public String generate(String userId, String email, String role){
    long now = System.currentTimeMillis();
    return Jwts.builder().setSubject(userId).addClaims(Map.of("email",email,"role",role))
      .setIssuedAt(new Date(now)).setExpiration(new Date(now+exp))
      .signWith(key, SignatureAlgorithm.HS256).compact();
  }
  public Jws<Claims> parse(String token){
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
  }
}
