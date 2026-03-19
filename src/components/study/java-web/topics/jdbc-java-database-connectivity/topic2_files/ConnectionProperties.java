import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionProperties {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        Properties props = new Properties();
        props.setProperty("user", "root");
        props.setProperty("password", "password");
        props.setProperty("useSSL", "false");
        props.setProperty("serverTimezone", "UTC");

        try (Connection conn = DriverManager.getConnection(url, props)) {
            System.out.println("✅ Connected using Properties object!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}