import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionURLDemo {
    public static void main(String[] args) {
        // MySQL
        String mysqlURL = "jdbc:mysql://localhost:3306/schoolDB?useSSL=false&serverTimezone=UTC";
        // PostgreSQL
        String postgresURL = "jdbc:postgresql://localhost:5432/schoolDB";
        // Oracle (thin)
        String oracleURL = "jdbc:oracle:thin:@localhost:1521:xe";
        // H2 (embedded)
        String h2URL = "jdbc:h2:~/test";

        System.out.println("MySQL URL: " + mysqlURL);
        System.out.println("PostgreSQL URL: " + postgresURL);
        System.out.println("Oracle URL: " + oracleURL);
        System.out.println("H2 URL: " + h2URL);

        // Attempt MySQL connection (example)
        try (Connection conn = DriverManager.getConnection(mysqlURL, "root", "password")) {
            System.out.println("✅ MySQL connection established.");
        } catch (SQLException e) {
            System.out.println("❌ MySQL connection failed (ensure driver is in classpath).");
            e.printStackTrace();
        }
    }
}