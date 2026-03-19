import java.sql.*;

public class TransactionRollback {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/bankDB";
        String user = "root";
        String password = "password";

        String debitSQL = "UPDATE accounts SET balance = balance - 200 WHERE account_id = 1";
        // Intentional error: wrong table name to trigger rollback
        String creditSQL = "UPDATE accounts_wrong SET balance = balance + 200 WHERE account_id = 2";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setAutoCommit(false);

            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(debitSQL);
                stmt.executeUpdate(creditSQL); // This will throw exception
                conn.commit();
                System.out.println("Transaction committed.");
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transaction rolled back due to error: " + e.getMessage());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}