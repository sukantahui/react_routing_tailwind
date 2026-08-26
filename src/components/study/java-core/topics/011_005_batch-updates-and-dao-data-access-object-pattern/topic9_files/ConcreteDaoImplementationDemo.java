/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 9: Concrete DAO Implementation - StudentDaoJdbcImpl
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ConcreteDaoImplementationDemo {

    public record Student(Integer id, String name, double score, String center) {}

    public interface StudentDao {
        Optional<Student> findById(int id);
        List<Student> findAll();
        void save(Student student);
        boolean deleteById(int id);
    }

    // Concrete JDBC DAO Implementation:
    public static class StudentDaoJdbcImpl implements StudentDao {
        private final DataSource dataSource;

        public StudentDaoJdbcImpl(DataSource dataSource) {
            this.dataSource = dataSource;
        }

        @Override
        public Optional<Student> findById(int id) {
            String sql = "SELECT student_id, name, score, center FROM students WHERE student_id = ?";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {

                pstmt.setInt(1, id);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        return Optional.of(new Student(
                            rs.getInt("student_id"),
                            rs.getString("name"),
                            rs.getDouble("score"),
                            rs.getString("center")
                        ));
                    }
                }
            } catch (SQLException ex) {
                throw new RuntimeException("Data access error in findById: " + ex.getMessage(), ex);
            }
            return Optional.empty();
        }

        @Override
        public List<Student> findAll() {
            String sql = "SELECT student_id, name, score, center FROM students ORDER BY name ASC";
            List<Student> list = new ArrayList<>();
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(sql);
                 ResultSet rs = pstmt.executeQuery()) {

                while (rs.next()) {
                    list.add(new Student(
                        rs.getInt("student_id"),
                        rs.getString("name"),
                        rs.getDouble("score"),
                        rs.getString("center")
                    ));
                }
            } catch (SQLException ex) {
                throw new RuntimeException("Data access error in findAll: " + ex.getMessage(), ex);
            }
            return list;
        }

        @Override
        public void save(Student s) {
            String sql = "INSERT INTO students (student_id, name, score, center) VALUES (?, ?, ?, ?)";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {

                pstmt.setInt(1, s.id());
                pstmt.setString(2, s.name());
                pstmt.setDouble(3, s.score());
                pstmt.setString(4, s.center());
                pstmt.executeUpdate();

            } catch (SQLException ex) {
                throw new RuntimeException("Data access error in save: " + ex.getMessage(), ex);
            }
        }

        @Override
        public boolean deleteById(int id) {
            String sql = "DELETE FROM students WHERE student_id = ?";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {

                pstmt.setInt(1, id);
                return pstmt.executeUpdate() > 0;

            } catch (SQLException ex) {
                throw new RuntimeException("Data access error in deleteById: " + ex.getMessage(), ex);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: CONCRETE JDBC DAO IMPLEMENTATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("StudentDaoJdbcImpl encapsulates all SQL queries and connection handling safely.");
    }
}
