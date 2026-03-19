import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;
import java.util.List;

public class DAODemo {
    public static void main(String[] args) {
        // Setup DataSource (HikariCP)
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/schoolDB");
        config.setUsername("root");
        config.setPassword("password");
        config.setMaximumPoolSize(5);

        DataSource dataSource = new HikariDataSource(config);

        // Create DAO instance
        StudentDAO studentDAO = new StudentDAOImpl(dataSource);

        // Create a new student
        Student newStudent = new Student(0, "Swadeep", 20, "Barrackpore");
        studentDAO.save(newStudent);
        System.out.println("Student saved.");

        // Retrieve all students
        List<Student> students = studentDAO.getAll();
        System.out.println("All students:");
        for (Student s : students) {
            System.out.println(s);
        }

        // Update a student (assume id 1 exists)
        Student student = studentDAO.getById(1);
        if (student != null) {
            student.setCity("Kolkata");
            studentDAO.update(student);
            System.out.println("Student updated.");
        }

        // Delete a student (id 2)
        studentDAO.delete(2);
        System.out.println("Student deleted (if existed).");
    }
}