import java.sql.*;

public class DeleteRowResultSet {
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

            // Delete the row with id = 2 (or any specific row)
            while (rs.next()) {
                if (rs.getInt("id") == 2) {
                    rs.deleteRow();
                    System.out.println("Row with id 2 deleted.");
                    break;
                }
            }

            // Show remaining rows
            rs.beforeFirst();
            while (rs.next()) {
                System.out.printf("%d: %s%n", rs.getInt("id"), rs.getString("name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}