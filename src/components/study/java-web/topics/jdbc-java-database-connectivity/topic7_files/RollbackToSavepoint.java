import java.sql.*;

public class RollbackToSavepoint {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String insertA = "INSERT INTO students (name, age, city) VALUES ('Amit', 22, 'Pune')";
        String insertB = "INSERT INTO students (name, age, city) VALUES ('Sneha', 21, 'Chennai')";
        String insertC = "INSERT INTO students (name, age, city) VALUES ('Raj', 23, 'Jaipur')";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setAutoCommit(false);

            Savepoint sp1 = null;
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(insertA);
                sp1 = conn.setSavepoint("sp1");

                stmt.executeUpdate(insertB);
                // Simulate an error
                if (true) throw new SQLException("Simulated error after insertB");

                stmt.executeUpdate(insertC);
                conn.commit();
            } catch (SQLException e) {
                System.out.println("Error: " + e.getMessage());
                if (sp1 != null) {
                    conn.rollback(sp1);
                    System.out.println("Rolled back to savepoint. InsertA preserved.");
                } else {
                    conn.rollback();
                    System.out.println("No savepoint, full rollback.");
                }
                // Now commit the partial work (insertA)
                conn.commit();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}