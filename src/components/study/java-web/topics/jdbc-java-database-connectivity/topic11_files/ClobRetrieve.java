import java.sql.*;
import java.io.Reader;
import java.io.FileWriter;
import java.io.IOException;

public class ClobRetrieve {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/libraryDB";
        String user = "root";
        String password = "password";

        String sql = "SELECT description FROM books WHERE id = ?";
        int bookId = 1; // assume this ID exists
        String outputFile = "retrieved_description.txt";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, bookId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    // Get the CLOB as a character stream
                    try (Reader reader = rs.getCharacterStream("description");
                         FileWriter writer = new FileWriter(outputFile)) {

                        char[] buffer = new char[1024];
                        int charsRead;
                        while ((charsRead = reader.read(buffer)) != -1) {
                            writer.write(buffer, 0, charsRead);
                        }
                        System.out.println("Description saved to " + outputFile);
                    }
                }
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}