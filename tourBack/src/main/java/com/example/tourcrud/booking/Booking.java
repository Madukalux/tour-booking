package com.example.tourcrud.booking;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate; import java.time.LocalDateTime;
@Document("bookings") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Booking {
  @Id private String id;
  private String userId;
  private String packageId;
  private LocalDate startDate;
  private int numPeople;
  private BookingStatus status;
  private LocalDateTime createdAt;
}
