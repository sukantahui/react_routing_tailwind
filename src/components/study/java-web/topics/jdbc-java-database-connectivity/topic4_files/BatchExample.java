import java.sql.*;

public class BatchExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String insertSQL = "INSERT INTO students (name, age, city) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {

            // First student
            pstmt.setString(1, "Debangshu");
            pstmt.setInt(2, 22);
            pstmt.setString(3, "Naihati");
            pstmt.addBatch();

            // Second student
            pstmt.setString(1, "Swadeep");
            pstmt.setInt(2, 20);
            pstmt.setString(3, "Barrackpore");
            pstmt.addBatch();

            // Third student
            pstmt.setString(1, "Tuhina");
            pstmt.setInt(2, 19);
            pstmt.setString(3, "Shyamnagar");
            pstmt.addBatch();

            int[] results = pstmt.executeBatch();
            System.out.println("Batch executed. Affected rows: " + results.length);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}