import java.sql.*;
import java.io.*;

public class MultiCatch {
    public static void main(String[] args) {
        try {
            // Simulate both SQL and file operations
            Class.forName("com.mysql.cj.jdbc.Driver"); // may throw ClassNotFoundException
            Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/schoolDB", "root", "password");
            
            // Read SQL from a file (just for demo)
            BufferedReader reader = new BufferedReader(new FileReader("query.sql"));
            String query = reader.readLine();
            reader.close();
            
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(query)) {
                while (rs.next()) {
                    System.out.println(rs.getString(1));
                }
            }
            
        } catch (ClassNotFoundException | SQLException | IOException e) {
            // Multi-catch: handle all these exception types uniformly
            System.err.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }
}