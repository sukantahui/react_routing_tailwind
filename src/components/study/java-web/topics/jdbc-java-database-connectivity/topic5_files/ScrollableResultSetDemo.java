import java.sql.*;

public class ScrollableResultSetDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String query = "SELECT id, name, age, city FROM students";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             // Create a scrollable, read-only ResultSet
             Statement stmt = conn.createStatement(
                     ResultSet.TYPE_SCROLL_INSENSITIVE,
                     ResultSet.CONCUR_READ_ONLY);
             ResultSet rs = stmt.executeQuery(query)) {

            // Move to last row to get row count
            rs.last();
            int rowCount = rs.getRow();
            System.out.println("Total rows: " + rowCount);

            // Move to first row
            rs.first();
            System.out.println("First row: " + rs.getString("name"));

            // Move to second last row
            rs.absolute(rowCount - 1);
            System.out.println("Second last row: " + rs.getString("name"));

            // Move back
            rs.previous();
            System.out.println("Previous (last) row: " + rs.getString("name"));

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}