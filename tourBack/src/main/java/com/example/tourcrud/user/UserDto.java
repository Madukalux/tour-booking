package com.example.tourcrud.user;
import jakarta.validation.constraints.*; import lombok.*;
public class UserDto {
  @Getter @Setter public static class Register { @NotBlank private String name; @Email @NotBlank private String email; @Size(min=6) private String password; }
  @Getter @Setter public static class Login { @Email @NotBlank private String email; @NotBlank private String password; }
  @Getter @Setter public static class UpdateProfile { @NotBlank private String name; }
  @Getter @Setter @AllArgsConstructor public static class AuthResponse { private String token; private String role; private String userId; private String name; private String email; }
}
