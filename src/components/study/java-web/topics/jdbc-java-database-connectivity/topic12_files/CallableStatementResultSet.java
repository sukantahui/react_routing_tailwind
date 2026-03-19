import java.sql.*;

public class CallableStatementResultSet {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Stored procedure: get_all_students() returns a result set
        String sql = "{call get_all_students()}";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CallableStatement cstmt = conn.prepareCall(sql);
             ResultSet rs = cstmt.executeQuery()) {

            while (rs.next()) {
                System.out.printf("ID: %d, Name: %s, Age: %d, City: %s%n",
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("age"),
                        rs.getString("city"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}