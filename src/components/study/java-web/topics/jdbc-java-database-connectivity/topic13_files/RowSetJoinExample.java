import javax.sql.rowset.JoinRowSet;
import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetProvider;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class RowSetJoinExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             CachedRowSet studentsRs = RowSetProvider.newFactory().createCachedRowSet();
             CachedRowSet coursesRs = RowSetProvider.newFactory().createCachedRowSet();
             JoinRowSet joinRs = RowSetProvider.newFactory().createJoinRowSet()) {

            // Fetch students
            studentsRs.setCommand("SELECT id, name FROM students");
            studentsRs.execute(conn);
            studentsRs.setMatchColumn("id"); // column to join on

            // Fetch courses (assuming a courses table with student_id)
            coursesRs.setCommand("SELECT student_id, course_name FROM courses");
            coursesRs.execute(conn);
            coursesRs.setMatchColumn("student_id");

            // Add both to JoinRowSet
            joinRs.addRowSet(studentsRs);
            joinRs.addRowSet(coursesRs);

            // Now joinRs contains the joined data
            while (joinRs.next()) {
                System.out.printf("Student: %s, Course: %s%n",
                        joinRs.getString("name"),
                        joinRs.getString("course_name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}