import java.sql.*;

/**
 * UserDAO – Example of a Data Access Object using JDBC.
 * It encapsulates all database operations related to users.
 */
public class UserDAO {

    // Database credentials (in real app, externalize to properties)
    private static final String URL = "jdbc:mysql://localhost:3306/school";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    /**
     * Validates a user by querying the database.
     * @param username the username
     * @param password the password
     * @return a UserBean if valid, null otherwise
     */
    public UserBean validateUser(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, password);  // In real app, hash the password!

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    UserBean user = new UserBean();
                    user.setId(rs.getInt("id"));
                    user.setUsername(rs.getString("username"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    return user;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();  // In real app, use logging
        }
        return null;
    }

    // Other CRUD methods would go here...
}