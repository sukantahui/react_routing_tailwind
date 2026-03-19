import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class CreateTable {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String createTableSQL = "CREATE TABLE IF NOT EXISTS students (" +
                "id INT AUTO_INCREMENT PRIMARY KEY, " +
                "name VARCHAR(100) NOT NULL, " +
                "age INT, " +
                "city VARCHAR(50))";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // executeUpdate() used for DDL (CREATE, ALTER, DROP) as well
            int result = stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'students' created successfully. Result: " + result);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}