import java.sql.*;

public class ResultSetMetaDataDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String query = "SELECT * FROM students";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            System.out.println("Column details:");
            for (int i = 1; i <= columnCount; i++) {
                System.out.printf("Column %d: %s (%s)%n",
                        i,
                        rsmd.getColumnName(i),
                        rsmd.getColumnTypeName(i));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}