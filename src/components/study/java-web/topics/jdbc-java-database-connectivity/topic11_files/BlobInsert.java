import java.sql.*;
import java.io.FileInputStream;
import java.io.IOException;

public class BlobInsert {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/libraryDB";
        String user = "root";
        String password = "password";

        String sql = "INSERT INTO books (title, cover_image, description) VALUES (?, ?, ?)";
        String imagePath = "book_cover.jpg"; // assume this file exists

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             FileInputStream fis = new FileInputStream(imagePath)) {

            pstmt.setString(1, "Java Programming");
            // Set BLOB parameter using input stream (streaming)
            pstmt.setBinaryStream(2, fis, fis.available()); // .available() gives file size (for small files)
            // For very large files, better to pass length separately or use setBinaryStream with no length
            pstmt.setString(3, "A comprehensive guide to Java.");

            int rows = pstmt.executeUpdate();
            System.out.println(rows + " row(s) inserted with BLOB.");

        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}