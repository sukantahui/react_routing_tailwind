import java.sql.*;

public class InsertRowResultSet {
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

            // Move to insert row
            rs.moveToInsertRow();

            // Set values for the new row
            rs.updateString("name", "Rohan");
            rs.updateInt("age", 22);
            rs.updateString("city", "Delhi");
            // id is auto-generated, so we don't set it

            // Insert the row
            rs.insertRow();
            System.out.println("New row inserted.");

            // Move back to the current row (optional)
            rs.moveToCurrentRow();

            // Display all rows to confirm
            rs.beforeFirst();
            while (rs.next()) {
                System.out.printf("%d: %s%n", rs.getInt("id"), rs.getString("name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}