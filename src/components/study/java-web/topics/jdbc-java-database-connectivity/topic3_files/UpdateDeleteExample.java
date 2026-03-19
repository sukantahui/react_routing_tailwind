import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class UpdateDeleteExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String updateSQL = "UPDATE students SET age = 22 WHERE name = 'Swadeep'";
        String deleteSQL = "DELETE FROM students WHERE name = 'Abhronila'";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // Update
            int updatedRows = stmt.executeUpdate(updateSQL);
            System.out.println(updatedRows + " row(s) updated.");

            // Delete
            int deletedRows = stmt.executeUpdate(deleteSQL);
            System.out.println(deletedRows + " row(s) deleted.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}