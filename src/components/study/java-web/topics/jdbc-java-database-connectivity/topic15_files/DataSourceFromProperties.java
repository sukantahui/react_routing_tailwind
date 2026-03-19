import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DataSourceFromProperties {
    public static void main(String[] args) {
        Properties props = new Properties();
        
        try (InputStream input = DataSourceFromProperties.class.getClassLoader()
                .getResourceAsStream("db.properties")) {
            
            props.load(input);
            
            // Create HikariCP config from properties
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(props.getProperty("db.url"));
            config.setUsername(props.getProperty("db.username"));
            config.setPassword(props.getProperty("db.password"));
            config.setMaximumPoolSize(Integer.parseInt(props.getProperty("db.pool.size", "10")));
            
            try (HikariDataSource dataSource = new HikariDataSource(config);
                 Connection conn = dataSource.getConnection()) {
                System.out.println("Connected via HikariCP using properties!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}