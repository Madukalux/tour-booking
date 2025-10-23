package com.example.tourcrud.common;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.Map;
@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<?> bad(RuntimeException ex){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
  }
}
