import org.apache.commons.dbcp2.BasicDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class DBCPExample {
    public static void main(String[] args) {
        // Create and configure DBCP connection pool
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/schoolDB");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");

        // Pool configuration
        dataSource.setInitialSize(5);
        dataSource.setMaxTotal(20);
        dataSource.setMaxIdle(10);
        dataSource.setMinIdle(2);
        dataSource.setMaxWaitMillis(30000);
        dataSource.setValidationQuery("SELECT 1");
        dataSource.setTestOnBorrow(true);

        // Use connections from the pool
        for (int i = 0; i < 10; i++) {
            try (Connection conn = dataSource.getConnection()) {
                System.out.println("Got connection #" + i + " from pool");
                // Simulate work
                Thread.sleep(100);
            } catch (SQLException | InterruptedException e) {
                e.printStackTrace();
            }
        }

        // Close the pool when application shuts down
        try {
            dataSource.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}