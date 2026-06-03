// JdbcExample.java
// Demonstrates traditional JDBC code to fetch students from a database.
// Note the manual steps: DriverManager, Connection, Statement, ResultSet, and exception handling.

import java.sql.*;

public class JdbcExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/school_db";
        String user = "root";
        String password = "password";

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 1. Load & register the driver (optional for modern JDBC)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. Establish connection
            conn = DriverManager.getConnection(url, user, password);

            // 3. Create statement
            stmt = conn.createStatement();

            // 4. Execute query
            String sql = "SELECT id, name, age FROM student";
            rs = stmt.executeQuery(sql);

            // 5. Process result set (manual mapping)
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                System.out.println("Student: " + id + ", " + name + ", " + age);
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        } finally {
            // 6. Close resources (boilerplate)
            try { if (rs != null) rs.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (stmt != null) stmt.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (conn != null) conn.close(); } catch (SQLException e) { e.printStackTrace(); }
        }
    }
}