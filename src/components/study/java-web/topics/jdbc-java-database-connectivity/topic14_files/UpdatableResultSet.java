import java.sql.*;

public class UpdatableResultSet {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String query = "SELECT id, name, age, city FROM students";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement(
                     ResultSet.TYPE_SCROLL_INSENSITIVE,
                     ResultSet.CONCUR_UPDATABLE);
             ResultSet rs = stmt.executeQuery(query)) {

            // Update the city of the first row
            if (rs.next()) {
                System.out.println("Updating: " + rs.getString("name"));
                rs.updateString("city", "Kolkata");
                rs.updateRow(); // important: actually update the database
                System.out.println("City updated to Kolkata.");
            }

            // Verify update
            rs.beforeFirst();
            while (rs.next()) {
                System.out.printf("%d: %s, %s%n", rs.getInt("id"), rs.getString("name"), rs.getString("city"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}