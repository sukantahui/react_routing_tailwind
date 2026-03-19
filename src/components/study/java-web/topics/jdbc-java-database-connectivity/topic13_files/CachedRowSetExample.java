import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetProvider;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class CachedRowSetExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CachedRowSet crs = RowSetProvider.newFactory().createCachedRowSet()) {

            // Populate the CachedRowSet
            crs.setCommand("SELECT id, name, age, city FROM students");
            crs.execute(conn); // uses the provided connection

            // Now we can close the connection
            conn.close();
            System.out.println("Connection closed, but CachedRowSet still holds data.");

            // Navigate and modify offline
            crs.last();
            System.out.println("Total rows: " + crs.getRow());

            // Modify data (offline)
            crs.absolute(2);
            crs.updateString("city", "Delhi");
            crs.updateRow();

            // To sync changes back, we need a new connection
            try (Connection newConn = DriverManager.getConnection(url, user, password)) {
                crs.acceptChanges(newConn);
                System.out.println("Changes synchronized to database.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}