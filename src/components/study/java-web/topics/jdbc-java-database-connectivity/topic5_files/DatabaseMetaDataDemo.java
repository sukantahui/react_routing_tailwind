import java.sql.*;

public class DatabaseMetaDataDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            DatabaseMetaData dbmd = conn.getMetaData();

            System.out.println("Database: " + dbmd.getDatabaseProductName());
            System.out.println("Version: " + dbmd.getDatabaseProductVersion());
            System.out.println("Driver: " + dbmd.getDriverName());

            // Get list of tables
            ResultSet tables = dbmd.getTables(null, null, "%", new String[]{"TABLE"});
            System.out.println("\nTables in database:");
            while (tables.next()) {
                System.out.println("  " + tables.getString("TABLE_NAME"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}