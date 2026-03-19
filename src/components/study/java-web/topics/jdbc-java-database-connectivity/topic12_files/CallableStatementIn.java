import java.sql.*;

public class CallableStatementIn {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Assume a stored procedure: get_students_by_city(IN city_name VARCHAR)
        String sql = "{call get_students_by_city(?)}";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CallableStatement cstmt = conn.prepareCall(sql)) {

            cstmt.setString(1, "Barrackpore");
            boolean hadResults = cstmt.execute();

            if (hadResults) {
                try (ResultSet rs = cstmt.getResultSet()) {
                    while (rs.next()) {
                        System.out.println(rs.getString("name"));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}