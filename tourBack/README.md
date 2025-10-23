# Tour CRUD Backend (Spring Boot + MongoDB + JWT)

**What you can demo (matches rubric):**
- CRUD #1: Users — register (create), read (me), update (name), delete (admin).
- CRUD #2: Bookings — create, list mine, update mine, delete mine.
- DB connection: MongoDB (`spring.data.mongodb.uri`).
- Validations: `@Email`, `@NotBlank`, `@Size`, `@Future`, `@Min(1)`.
- Security: JWT + role (USER/ADMIN).

## Quick start
1. Install Java 17 + Maven + MongoDB.
2. Update `src/main/resources/application.properties`:
   - `spring.data.mongodb.uri=mongodb://localhost:27017/tour_crud`
   - set a long random `app.jwt.secret`.
3. Run:
```bash
mvn spring-boot:run
```

## Endpoints
- `POST /api/auth/register` — body: `{"name":"Kaneesha","email":"k@ex.com","password":"Secret123"}`
- `POST /api/auth/login` — returns `token`
- `GET /api/users/me` — (Bearer token)
- `PUT /api/users/me` — update name
- `POST /api/bookings` — body: `{"packageId":"SIGIRIYA_DAY","startDate":"2030-05-20","numPeople":2}`
- `GET /api/bookings/me`
- `PUT /api/bookings/{id}`
- `DELETE /api/bookings/{id}`

### Optional admin
Seed a user with role `ADMIN` to use:
- `GET /api/admin/users`
- `DELETE /api/admin/users/{id}`
