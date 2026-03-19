import java.sql.*;

public class PreparedStatementBatch {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String sql = "INSERT INTO students (name, age, city) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            conn.setAutoCommit(false);

            // First record
            pstmt.setString(1, "Swadeep");
            pstmt.setInt(2, 20);
            pstmt.setString(3, "Barrackpore");
            pstmt.addBatch();

            // Second record
            pstmt.setString(1, "Tuhina");
            pstmt.setInt(2, 19);
            pstmt.setString(3, "Shyamnagar");
            pstmt.addBatch();

            // Third record
            pstmt.setString(1, "Abhronila");
            pstmt.setInt(2, 21);
            pstmt.setString(3, "Ichapur");
            pstmt.addBatch();

            // Execute batch
            int[] counts = pstmt.executeBatch();
            System.out.println("Inserted " + counts.length + " records.");

            conn.commit();

        } catch (BatchUpdateException e) {
            System.err.println("Batch failed. Successful count: " + e.getUpdateCounts().length);
            e.printStackTrace();
            // rollback logic...
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}