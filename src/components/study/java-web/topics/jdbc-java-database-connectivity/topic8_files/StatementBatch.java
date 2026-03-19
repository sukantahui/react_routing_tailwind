import java.sql.*;

public class StatementBatch {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // Disable auto-commit for better control (optional)
            conn.setAutoCommit(false);

            // Add multiple SQL commands to batch
            stmt.addBatch("INSERT INTO students (name, age, city) VALUES ('Ravi', 20, 'Delhi')");
            stmt.addBatch("INSERT INTO students (name, age, city) VALUES ('Priya', 21, 'Mumbai')");
            stmt.addBatch("INSERT INTO students (name, age, city) VALUES ('Amit', 22, 'Kolkata')");
            stmt.addBatch("UPDATE students SET age = 23 WHERE name = 'Ravi'");

            // Execute batch
            int[] updateCounts = stmt.executeBatch();
            System.out.println("Batch executed. Number of affected rows per command:");
            for (int count : updateCounts) {
                System.out.println("  " + count);
            }

            // Commit transaction
            conn.commit();

        } catch (BatchUpdateException e) {
            // Handle batch exception
            System.err.println("Batch failed at command index: " + e.getUpdateCounts().length);
            e.printStackTrace();
            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                conn.rollback(); // rollback if needed
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}