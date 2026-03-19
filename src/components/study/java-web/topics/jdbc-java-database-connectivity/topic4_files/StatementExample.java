import java.sql.*;

public class StatementExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Simulate user input (e.g., from a login form)
        String userInput = "admin' OR '1'='1"; // malicious input

        // Vulnerable query concatenation
        String query = "SELECT * FROM users WHERE username = '" + userInput + "'";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            System.out.println("Executing: " + query);
            if (rs.next()) {
                System.out.println("⚠️ Login successful without valid credentials!");
            } else {
                System.out.println("Login failed.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}