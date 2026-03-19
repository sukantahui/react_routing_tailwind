import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionExample {
    public static void main(String[] args) {
        // Database credentials
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String username = "root";
        String password = "password";

        Connection conn = null;
        try {
            // Establishing connection (driver auto-loaded)
            conn = DriverManager.getConnection(url, username, password);
            System.out.println("✅ Connection successful!");
        } catch (SQLException e) {
            System.out.println("❌ Connection failed!");
            e.printStackTrace();
        } finally {
            // Always close connection
            if (conn != null) {
                try {
                    conn.close();
                    System.out.println("Connection closed.");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}