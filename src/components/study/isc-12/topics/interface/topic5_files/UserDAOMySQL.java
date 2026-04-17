// UserDAOMySQL.java (Simulated MySQL implementation)
import java.util.*;

public class UserDAOMySQL implements UserDAO {
    private Map<Integer, User> database = new HashMap<>();
    private int nextId = 1;

    @Override
    public void addUser(String name, String email) {
        User user = new User(nextId++, name, email);
        database.put(user.getId(), user);
        System.out.println("MySQL: Added user " + name);
    }

    @Override
    public User findUserById(int id) {
        return database.get(id);
    }

    @Override
    public List<User> getAllUsers() {
        return new ArrayList<>(database.values());
    }

    @Override
    public void updateUserEmail(int id, String newEmail) {
        User user = database.get(id);
        if (user != null) {
            // In real code, you'd update DB. Here we simulate.
            System.out.println("MySQL: Updated email for user " + id);
        }
    }

    @Override
    public void deleteUser(int id) {
        database.remove(id);
        System.out.println("MySQL: Deleted user " + id);
    }
}