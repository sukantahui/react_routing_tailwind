import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class InsertRecord {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String insertSQL = "INSERT INTO students (name, age, city) VALUES " +
                "('Swadeep', 20, 'Barrackpore'), " +
                "('Tuhina', 19, 'Shyamnagar'), " +
                "('Abhronila', 21, 'Ichapur')";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            int rowsAffected = stmt.executeUpdate(insertSQL);
            System.out.println(rowsAffected + " row(s) inserted.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
