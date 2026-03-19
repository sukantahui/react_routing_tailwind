import java.sql.*;
import java.io.FileReader;
import java.io.IOException;

public class ClobInsert {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/libraryDB";
        String user = "root";
        String password = "password";

        String sql = "INSERT INTO books (title, description) VALUES (?, ?)";
        String descriptionPath = "book_description.txt"; // assume this file exists

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             FileReader fr = new FileReader(descriptionPath)) {

            pstmt.setString(1, "Effective Java");
            // Set CLOB parameter using character stream
            pstmt.setCharacterStream(2, fr);

            int rows = pstmt.executeUpdate();
            System.out.println(rows + " row(s) inserted with CLOB.");

        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}