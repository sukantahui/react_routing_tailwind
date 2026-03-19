import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class MultiEnvProperties {
    public static void main(String[] args) {
        // Determine environment (could come from system property, environment variable, etc.)
        String env = System.getProperty("app.env", "dev"); // default to dev
        String fileName = "application-" + env + ".properties";
        
        Properties props = new Properties();
        
        try (InputStream input = MultiEnvProperties.class.getClassLoader()
                .getResourceAsStream(fileName)) {
            
            if (input == null) {
                System.err.println("Sorry, unable to find " + fileName);
                return;
            }
            
            props.load(input);
            
            String url = props.getProperty("db.url");
            String user = props.getProperty("db.username");
            String password = props.getProperty("db.password");
            
            System.out.println("Loading configuration for environment: " + env);
            System.out.println("URL: " + url);
            
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                System.out.println("Connection successful!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}