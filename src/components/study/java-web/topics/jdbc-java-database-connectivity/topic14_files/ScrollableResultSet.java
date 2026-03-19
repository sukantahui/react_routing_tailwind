import java.sql.*;

public class ScrollableResultSet {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String query = "SELECT id, name, age, city FROM students";

        try (Connection conn = DriverManager.getConnection(url, user, password);
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

            // Move to row 2 using absolute
            rs.absolute(2);
            System.out.println("Row 2: " + rs.getString("name"));

            // Move back one row using relative
            rs.relative(-1);
            System.out.println("After relative(-1): " + rs.getString("name"));

            // Check if first
            System.out.println("Is first? " + rs.isFirst());

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}