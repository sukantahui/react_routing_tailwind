import java.sql.*;

public class ComparisonDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        // Measure Statement performance for repeated inserts
        long start = System.currentTimeMillis();
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            for (int i = 0; i < 100; i++) {
                String sql = "INSERT INTO log (message) VALUES ('Statement " + i + "')";
                stmt.executeUpdate(sql);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long statementTime = System.currentTimeMillis() - start;
        System.out.println("Statement time: " + statementTime + " ms");

        // Measure PreparedStatement performance for repeated inserts
        start = System.currentTimeMillis();
        String insertSQL = "INSERT INTO log (message) VALUES (?)";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {

            for (int i = 0; i < 100; i++) {
                pstmt.setString(1, "PreparedStatement " + i);
                pstmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long preparedTime = System.currentTimeMillis() - start;
        System.out.println("PreparedStatement time: " + preparedTime + " ms");
    }
}