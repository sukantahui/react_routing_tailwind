/**
 * This file demonstrates the separation of Business and Data tiers.
 * It contains a simple UserService (business tier) and UserDAO (data tier).
 */

// ---------- Data Tier (DAO) ----------
class UserDAO {
    // In a real app, this would use JDBC or JPA.
    public User findById(String id) {
        // Simulate database access
        System.out.println("UserDAO: SELECT * FROM users WHERE id = " + id);
        return new User(id, "John Doe", "john@example.com");
    }
}

// ---------- Business Tier (Service) ----------
class UserService {
    private UserDAO userDAO = new UserDAO(); // normally injected

    public User findUserById(String id) {
        // Business logic could go here (validation, caching, etc.)
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty");
        }
        return userDAO.findById(id);
    }
}

// ---------- Simple POJO (Model) ----------
class User {
    private String id;
    private String name;
    private String email;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // getters and setters (omitted for brevity)
}