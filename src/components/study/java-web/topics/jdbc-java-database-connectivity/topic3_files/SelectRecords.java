import java.sql.*;

public class SelectRecords {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String selectSQL = "SELECT id, name, age, city FROM students";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(selectSQL)) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                String city = rs.getString("city");
                System.out.printf("ID: %d, Name: %s, Age: %d, City: %s%n", id, name, age, city);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}