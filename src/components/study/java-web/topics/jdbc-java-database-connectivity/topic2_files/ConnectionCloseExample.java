import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionCloseExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, user, password);
            System.out.println("✅ Connected.");
            // do some work...
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    System.out.println("Connection closed.");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}