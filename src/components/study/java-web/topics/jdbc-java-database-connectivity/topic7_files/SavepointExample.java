import java.sql.*;

public class SavepointExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        String insert1 = "INSERT INTO students (name, age, city) VALUES ('Rohan', 20, 'Kolkata')";
        String insert2 = "INSERT INTO students (name, age, city) VALUES ('Priya', 19, 'Delhi')";
        String insert3 = "INSERT INTO students (name, age, city) VALUES ('Anil', 21, 'Mumbai')";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setAutoCommit(false);

            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(insert1);
                System.out.println("Insert 1 executed.");

                // Create a savepoint
                Savepoint sp1 = conn.setSavepoint("AfterInsert1");

                stmt.executeUpdate(insert2);
                System.out.println("Insert 2 executed.");

                // Oops, something went wrong, let's rollback to sp1
                conn.rollback(sp1);
                System.out.println("Rolled back to savepoint, insert2 undone.");

                // Now execute insert3
                stmt.executeUpdate(insert3);
                System.out.println("Insert 3 executed.");

                // Commit everything (insert1 and insert3)
                conn.commit();
                System.out.println("Transaction committed. Only insert1 and insert3 remain.");
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}