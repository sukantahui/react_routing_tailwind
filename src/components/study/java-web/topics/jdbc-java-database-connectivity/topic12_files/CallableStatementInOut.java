import java.sql.*;

public class CallableStatementInOut {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Stored procedure: increment_counter(INOUT counter INT)
        String sql = "{call increment_counter(?)}";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CallableStatement cstmt = conn.prepareCall(sql)) {

            cstmt.setInt(1, 5);
            cstmt.registerOutParameter(1, Types.INTEGER);

            cstmt.execute();

            int newValue = cstmt.getInt(1);
            System.out.println("New counter value: " + newValue);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}