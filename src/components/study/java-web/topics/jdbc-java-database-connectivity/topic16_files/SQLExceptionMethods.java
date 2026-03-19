import java.sql.*;

public class SQLExceptionMethods {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "wrongpassword"; // Intentional wrong password
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connected (should not happen)");
        } catch (SQLException e) {
            System.out.println("SQLException caught!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("SQLState: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
            
            // Iterate through chained exceptions
            SQLException next = e.getNextException();
            while (next != null) {
                System.out.println("Next exception:");
                System.out.println("  Message: " + next.getMessage());
                System.out.println("  SQLState: " + next.getSQLState());
                System.out.println("  Error Code: " + next.getErrorCode());
                next = next.getNextException();
            }
        }
    }
}