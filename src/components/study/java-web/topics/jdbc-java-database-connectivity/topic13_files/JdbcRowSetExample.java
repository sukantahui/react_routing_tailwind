import javax.sql.rowset.JdbcRowSet;
import javax.sql.rowset.RowSetProvider;
import java.sql.SQLException;

public class JdbcRowSetExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        try (JdbcRowSet jrs = RowSetProvider.newFactory().createJdbcRowSet()) {
            jrs.setUrl(url);
            jrs.setUsername(user);
            jrs.setPassword(password);
            jrs.setCommand("SELECT id, name, age, city FROM students");
            jrs.execute();

            // JdbcRowSet is scrollable and updatable
            jrs.last();
            System.out.println("Total rows: " + jrs.getRow());

            jrs.beforeFirst();
            while (jrs.next()) {
                System.out.printf("%d: %s (%d) from %s%n",
                        jrs.getInt("id"),
                        jrs.getString("name"),
                        jrs.getInt("age"),
                        jrs.getString("city"));
            }

            // Update example (connected)
            jrs.absolute(1);
            jrs.updateString("city", "Kolkata");
            jrs.updateRow(); // updates database immediately
            System.out.println("First row updated.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}