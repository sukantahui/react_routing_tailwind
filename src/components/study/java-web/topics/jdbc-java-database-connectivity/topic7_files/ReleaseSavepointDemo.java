import java.sql.*;

public class ReleaseSavepointDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String insertX = "INSERT INTO students (name, age, city) VALUES ('X', 20, 'Xcity')";
        String insertY = "INSERT INTO students (name, age, city) VALUES ('Y', 21, 'Ycity')";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setAutoCommit(false);

            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(insertX);
                Savepoint sp = conn.setSavepoint("sp");
                stmt.executeUpdate(insertY);

                // We decide we no longer need the savepoint
                conn.releaseSavepoint(sp);
                System.out.println("Savepoint released.");

                // Now we cannot rollback to sp
                try {
                    conn.rollback(sp); // This will throw SQLException
                } catch (SQLException e) {
                    System.out.println("Cannot rollback to released savepoint: " + e.getMessage());
                }

                // Commit the transaction
                conn.commit();
                System.out.println("Transaction committed.");
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}