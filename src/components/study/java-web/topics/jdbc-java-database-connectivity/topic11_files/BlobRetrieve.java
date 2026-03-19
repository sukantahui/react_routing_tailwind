import java.sql.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class BlobRetrieve {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/libraryDB";
        String user = "root";
        String password = "password";

        String sql = "SELECT cover_image FROM books WHERE id = ?";
        int bookId = 1; // assume this ID exists
        String outputFile = "retrieved_cover.jpg";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, bookId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    // Get the BLOB as an input stream
                    try (InputStream is = rs.getBinaryStream("cover_image");
                         FileOutputStream fos = new FileOutputStream(outputFile)) {

                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = is.read(buffer)) != -1) {
                            fos.write(buffer, 0, bytesRead);
                        }
                        System.out.println("Image saved to " + outputFile);
                    }
                }
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}