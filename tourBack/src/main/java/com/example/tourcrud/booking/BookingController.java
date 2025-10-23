package com.example.tourcrud.booking;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository repo;

    private String uid(Authentication a) {
        if (a == null) throw new RuntimeException("Unauthorized");
        return (String) a.getPrincipal();
    }

    // Create
    @PostMapping
    public ResponseEntity<Booking> create(Authentication a, @Valid @RequestBody BookingDto.Create req) {
        Booking b = Booking.builder()
                .id(null)
                .userId(uid(a))
                .packageId(req.getPackageId())
                .startDate(req.getStartDate())
                .numPeople(req.getNumPeople())
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(repo.save(b));
    }

    // Read (mine)
    @GetMapping("/me")
    public List<Booking> my(Authentication a) {
        return repo.findByUserId(uid(a));
    }

    // Update (mine)
    @PutMapping("/{id}")
    public Booking update(Authentication a,
                          @PathVariable("id") String id,    // ← name explicit
                          @Valid @RequestBody BookingDto.Update req) {
        String u = uid(a);
        Booking b = repo.findById(id).orElseThrow();
        if (!b.getUserId().equals(u)) throw new RuntimeException("Forbidden");
        if (b.getStatus() == BookingStatus.CANCELLED) throw new RuntimeException("Cannot edit cancelled booking");
        b.setStartDate(req.getStartDate());
        b.setNumPeople(req.getNumPeople());
        return repo.save(b);
    }

    // Delete (mine)
    @DeleteMapping("/{id}")
    public void delete(Authentication a, @PathVariable("id") String id) { // ← name explicit
        String u = uid(a);
        Booking b = repo.findById(id).orElseThrow();
        if (!b.getUserId().equals(u)) throw new RuntimeException("Forbidden");
        repo.deleteById(id);
    }
}
