package com.example.tourcrud.security;
import jakarta.servlet.*; import jakarta.servlet.http.*;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.*; import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component; import java.util.List;
@Component public class JwtFilter extends GenericFilter {
  private final JwtUtil jwt; public JwtFilter(JwtUtil jwt){ this.jwt = jwt; }
  @Override public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    var http = (HttpServletRequest) req; var h = http.getHeader(HttpHeaders.AUTHORIZATION);
    if(h!=null && h.startsWith("Bearer ")){
      try{
        var j = jwt.parse(h.substring(7));
        var uid = j.getBody().getSubject();
        var role = (String) j.getBody().get("role");
        List<GrantedAuthority> auths = List.of(new SimpleGrantedAuthority("ROLE_"+role));
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(uid, null, auths));
      }catch(Exception ignored){}
    }
    chain.doFilter(req, res);
  }
}
