import java.sql.*;

public class CallableStatementOut {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Stored procedure: get_student_count_by_city(IN city_name VARCHAR, OUT count INT)
        String sql = "{call get_student_count_by_city(?, ?)}";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CallableStatement cstmt = conn.prepareCall(sql)) {

            cstmt.setString(1, "Shyamnagar");
            cstmt.registerOutParameter(2, Types.INTEGER);

            cstmt.execute();

            int count = cstmt.getInt(2);
            System.out.println("Number of students in Shyamnagar: " + count);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}