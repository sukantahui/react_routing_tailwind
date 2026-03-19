import java.sql.*;

public class PreparedStatementExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Simulate safe user input
        String userInput = "admin' OR '1'='1"; // same malicious input

        // Safe query with placeholder
        String query = "SELECT * FROM users WHERE username = ?";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, userInput); // input is treated as data, not SQL
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                System.out.println("Login successful.");
            } else {
                System.out.println("✅ Login failed – malicious input didn't work.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}