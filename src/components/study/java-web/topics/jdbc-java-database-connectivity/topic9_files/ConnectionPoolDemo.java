import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPoolDemo {
    public static void main(String[] args) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/schoolDB");
        config.setUsername("root");
        config.setPassword("password");
        config.setMaximumPoolSize(3); // small pool for demo

        try (HikariDataSource dataSource = new HikariDataSource(config)) {
            // Borrow two connections
            Connection conn1 = dataSource.getConnection();
            Connection conn2 = dataSource.getConnection();
            System.out.println("Active connections: " + dataSource.getHikariPoolMXBean().getActiveConnections());

            // Return one to the pool
            conn1.close(); // not actually closed, returned to pool
            System.out.println("After closing conn1, active: " + dataSource.getHikariPoolMXBean().getActiveConnections());

            // Borrow a third – should reuse the returned connection
            Connection conn3 = dataSource.getConnection();
            System.out.println("After borrowing conn3, active: " + dataSource.getHikariPoolMXBean().getActiveConnections());

            // Clean up
            conn2.close();
            conn3.close();
            System.out.println("All returned, active: " + dataSource.getHikariPoolMXBean().getActiveConnections());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}