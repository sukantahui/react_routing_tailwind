import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class HikariExample {
    public static void main(String[] args) {
        // HikariCP configuration
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/schoolDB");
        config.setUsername("root");
        config.setPassword("password");
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");

        // Pool settings
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000); // maxWaitMillis equivalent
        config.setIdleTimeout(600000); // 10 minutes
        config.setConnectionTestQuery("SELECT 1");
        config.setConnectionInitSql("SELECT 1");

        // Create pool
        try (HikariDataSource dataSource = new HikariDataSource(config)) {
            for (int i = 0; i < 10; i++) {
                try (Connection conn = dataSource.getConnection()) {
                    System.out.println("Got HikariCP connection #" + i);
                    // Simulate work
                    Thread.sleep(100);
                } catch (SQLException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } // dataSource closed automatically
    }
}