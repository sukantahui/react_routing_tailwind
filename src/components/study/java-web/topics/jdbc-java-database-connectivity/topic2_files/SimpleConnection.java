import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SimpleConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Try-with-resources ensures connection is closed automatically
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("✅ Connected to database successfully!");
            System.out.println("Connection object: " + conn.getClass().getName());
        } catch (SQLException e) {
            System.err.println("❌ Connection failed!");
            e.printStackTrace();
        }
    }
}