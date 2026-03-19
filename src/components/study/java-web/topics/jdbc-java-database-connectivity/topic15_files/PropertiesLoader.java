import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class PropertiesLoader {
    public static void main(String[] args) {
        Properties props = new Properties();
        
        // Load properties file from classpath
        try (InputStream input = PropertiesLoader.class.getClassLoader()
                .getResourceAsStream("db.properties")) {
            
            if (input == null) {
                System.err.println("Sorry, unable to find db.properties");
                return;
            }
            
            props.load(input);
            
            // Get values
            String url = props.getProperty("db.url");
            String user = props.getProperty("db.username");
            String password = props.getProperty("db.password");
            
            // Connect to database
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                System.out.println("Connected to database using properties!");
                System.out.println("URL: " + url);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}