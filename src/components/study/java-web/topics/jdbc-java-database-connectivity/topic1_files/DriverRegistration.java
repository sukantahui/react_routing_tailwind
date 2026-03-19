// Demonstrates driver registration (old vs new)
import java.sql.DriverManager;
import java.sql.SQLException;

public class DriverRegistration {
    public static void main(String[] args) {
        // Old way: explicitly load driver class (pre-JDBC 4.0)
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // MySQL Type 4 driver
            System.out.println("Driver loaded using Class.forName()");
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found! Add JAR to classpath.");
        }

        // New way: since JDBC 4.0, drivers are auto-registered if JAR contains META-INF/services/java.sql.Driver
        // DriverManager will automatically discover any driver in classpath.
        // You can just request a connection.
        try {
            // DriverManager.getConnection(...) will automatically load suitable driver.
            // This line is just to illustrate; actual connection in next example.
            System.out.println("DriverManager automatically discovers drivers from classpath.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}