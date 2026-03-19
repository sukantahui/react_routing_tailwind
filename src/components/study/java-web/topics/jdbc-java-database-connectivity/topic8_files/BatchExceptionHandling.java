import java.sql.*;

public class BatchExceptionHandling {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String sql = "INSERT INTO students (name, age, city) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            conn.setAutoCommit(false);

            // Valid record
            pstmt.setString(1, "Valid");
            pstmt.setInt(2, 25);
            pstmt.setString(3, "ValidCity");
            pstmt.addBatch();

            // This record might cause an error if age is out of range, etc.
            pstmt.setString(1, "Invalid");
            pstmt.setInt(2, 999); // assuming age column has constraint
            pstmt.setString(3, "InvalidCity");
            pstmt.addBatch();

            // Another valid record
            pstmt.setString(1, "AnotherValid");
            pstmt.setInt(2, 22);
            pstmt.setString(3, "AnotherCity");
            pstmt.addBatch();

            int[] counts = pstmt.executeBatch();
            System.out.println("All batch commands succeeded.");
            conn.commit();

        } catch (BatchUpdateException e) {
            System.err.println("BatchUpdateException caught!");
            int[] updateCounts = e.getUpdateCounts();
            System.out.println("Number of successful commands before failure: " + updateCounts.length);
            for (int i = 0; i < updateCounts.length; i++) {
                System.out.println("Command " + i + " returned: " + updateCounts[i]);
            }
            // Rollback entire transaction or handle partial success
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                conn.rollback();
                System.out.println("Transaction rolled back.");
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}