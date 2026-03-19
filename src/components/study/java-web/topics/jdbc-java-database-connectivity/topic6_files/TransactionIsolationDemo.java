import java.sql.*;

public class TransactionIsolationDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/bankDB";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            // Check default isolation level
            System.out.println("Default isolation level: " + conn.getTransactionIsolation());

            // Set to a higher level (example: SERIALIZABLE)
            conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
            System.out.println("New isolation level: " + conn.getTransactionIsolation());

            // Now perform transactions...
            // (code omitted for brevity)
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}