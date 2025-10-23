package com.example.tourcrud.booking;
import jakarta.validation.constraints.*; import lombok.*; import java.time.LocalDate;
public class BookingDto {
  @Getter @Setter public static class Create { @NotBlank private String packageId; @Future @NotNull private LocalDate startDate; @Min(1) private int numPeople; }
  @Getter @Setter public static class Update { @Future @NotNull private LocalDate startDate; @Min(1) private int numPeople; }
}
