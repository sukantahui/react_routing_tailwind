import java.sql.*;

public class BasicTransaction {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/bankDB";
        String user = "root";
        String password = "password";

        String debitSQL = "UPDATE accounts SET balance = balance - 200 WHERE account_id = 1";
        String creditSQL = "UPDATE accounts SET balance = balance + 200 WHERE account_id = 2";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            // Disable auto-commit to start transaction
            conn.setAutoCommit(false);

            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(debitSQL);
                stmt.executeUpdate(creditSQL);

                // If both succeed, commit
                conn.commit();
                System.out.println("Transaction committed successfully.");
            } catch (SQLException e) {
                // If any error, rollback
                conn.rollback();
                System.out.println("Transaction rolled back due to error.");
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}