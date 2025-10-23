package com.example.tourcrud.user;
import com.example.tourcrud.security.JwtUtil;
import lombok.RequiredArgsConstructor; import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*; import jakarta.validation.Valid; import java.util.List;
@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class UserController {
  private final UserRepository repo; private final PasswordEncoder enc; private final JwtUtil jwt;
  @PostMapping("/auth/register")
  public ResponseEntity<UserDto.AuthResponse> register(@Valid @RequestBody UserDto.Register r){
    if(repo.existsByEmail(r.getEmail())) throw new RuntimeException("Email already in use");
    var u = User.builder().name(r.getName()).email(r.getEmail()).password(enc.encode(r.getPassword())).role(Role.USER).build();
    u = repo.save(u);
    var t = jwt.generate(u.getId(), u.getEmail(), u.getRole().name());
    return ResponseEntity.ok(new UserDto.AuthResponse(t, u.getRole().name(), u.getId(), u.getName(), u.getEmail()));
  }
  @PostMapping("/auth/login")
  public ResponseEntity<UserDto.AuthResponse> login(@Valid @RequestBody UserDto.Login r){
    var u = repo.findByEmail(r.getEmail()).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    if(!enc.matches(r.getPassword(), u.getPassword())) throw new RuntimeException("Invalid credentials");
    var t = jwt.generate(u.getId(), u.getEmail(), u.getRole().name());
    return ResponseEntity.ok(new UserDto.AuthResponse(t, u.getRole().name(), u.getId(), u.getName(), u.getEmail()));
  }
  @GetMapping("/users/me")
  public User me(Authentication auth){ return repo.findById((String)auth.getPrincipal()).orElseThrow(); }
  @PutMapping("/users/me")
  public User updateMe(Authentication auth, @Valid @RequestBody UserDto.UpdateProfile up){
    var u = repo.findById((String)auth.getPrincipal()).orElseThrow(); u.setName(up.getName()); return repo.save(u);
  }
  @GetMapping("/admin/users")
  public List<User> all(Authentication a){ ensureAdmin(a); return repo.findAll(); }
  @DeleteMapping("/admin/users/{id}")
  public void delete(Authentication a, @PathVariable String id){ ensureAdmin(a); repo.deleteById(id); }
  private void ensureAdmin(Authentication a){
    if(a==null || a.getAuthorities().stream().noneMatch(ga->ga.getAuthority().equals("ROLE_ADMIN"))) throw new RuntimeException("Admin only");
  }
}
