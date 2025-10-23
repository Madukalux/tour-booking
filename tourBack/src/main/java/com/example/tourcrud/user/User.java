package com.example.tourcrud.user;
import lombok.*; import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed; import org.springframework.data.mongodb.core.mapping.Document;
@Document("users") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
  @Id private String id;
  private String name;
  @Indexed(unique = true) private String email;
  private String password;
  private Role role;
}
