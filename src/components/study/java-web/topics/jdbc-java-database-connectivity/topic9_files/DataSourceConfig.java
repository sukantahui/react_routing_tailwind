import javax.sql.DataSource;
import com.mysql.cj.jdbc.MysqlDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class DataSourceConfig {
    public static void main(String[] args) {
        // Create a MySQL DataSource (not pooled, just a simple implementation)
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/schoolDB");
        dataSource.setUser("root");
        dataSource.setPassword("password");

        // Use the DataSource to get a connection
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("Connected using DataSource!");
            System.out.println("Connection class: " + conn.getClass().getName());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}