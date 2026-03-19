// This file demonstrates the JDBC architecture in action.
// Application -> DriverManager -> Driver -> Database
import java.sql.*;

public class ArchitectureDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String pass = "password";

        // 1. DriverManager locates a suitable driver for the URL
        // 2. That driver establishes connection
        // 3. Connection object returned to application
        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            System.out.println("Connected using: " + conn.getClass().getName());

            // Simple query to show interaction
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT 1");
            if (rs.next()) {
                System.out.println("Database responded: " + rs.getInt(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}