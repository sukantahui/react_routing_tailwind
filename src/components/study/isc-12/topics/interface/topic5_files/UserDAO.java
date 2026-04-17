// UserDAO.java (Data Access Object Interface)
import java.util.List;

public interface UserDAO {
    void addUser(String name, String email);
    User findUserById(int id);
    List<User> getAllUsers();
    void updateUserEmail(int id, String newEmail);
    void deleteUser(int id);
}

// Simple User class
class User {
    private int id;
    private String name;
    private String email;

    public User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}