import java.sql.*;

public class TransactionBatch {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String sql = "INSERT INTO students (name, age, city) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Start transaction
            conn.setAutoCommit(false);

            // Batch 100 records (simulated)
            for (int i = 1; i <= 100; i++) {
                pstmt.setString(1, "Student" + i);
                pstmt.setInt(2, 18 + (i % 10));
                pstmt.setString(3, "City" + (i % 5));
                pstmt.addBatch();

                // Execute every 20 records to avoid memory buildup
                if (i % 20 == 0) {
                    int[] counts = pstmt.executeBatch();
                    System.out.println("Batch of 20 executed, total so far: " + i);
                }
            }
            // Execute remaining batch if any
            pstmt.executeBatch();

            // Commit all
            conn.commit();
            System.out.println("Transaction committed.");

        } catch (SQLException e) {
            e.printStackTrace();
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                conn.rollback();
                System.out.println("Transaction rolled back.");
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}