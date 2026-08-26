/**
 * File: RealWorldDomainModelingDemo.java
 * Module: 002_001_classes-objects-memory-and-encapsulation (Topic 1)
 * Description: Demonstrates Real-World Domain Modeling in Java:
 *              1. Mapping real-world physical/conceptual entities to State (fields) & Behavior (methods)
 *              2. Entity 1: Student (Roll, name, GPA, attendance, honors eligibility)
 *              3. Entity 2: Course (Course code, title, max capacity, enrollment validation)
 *              4. Entity 3: FacultyMentor (Mentor ID, name, assigned students, payout in ₹)
 *              for campus academic administration at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.oop;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class RealWorldDomainModelingDemo {

    // =========================================================================
    // ENTITY 1: Student (State & Behavior Mapping)
    // =========================================================================
    public static class Student {
        // STATE (Attributes / Fields)
        private final int rollNumber;
        private final String studentName;
        private double attendancePercentage;
        private double gradePointAverage; // GPA on 10.0 scale

        public Student(int rollNumber, String studentName, double attendance, double gpa) {
            if (rollNumber <= 0) throw new IllegalArgumentException("Roll number must be positive");
            this.rollNumber = rollNumber;
            this.studentName = Objects.requireNonNull(studentName, "Student name cannot be null");
            setAttendancePercentage(attendance);
            setGradePointAverage(gpa);
        }

        // BEHAVIOR (Operations / Methods)
        public boolean isEligibleForHonors() {
            return this.gradePointAverage >= 9.0 && this.attendancePercentage >= 85.0;
        }

        public void recordAttendance(boolean present) {
            // Adjust attendance percentage
            if (present && this.attendancePercentage < 100.0) {
                this.attendancePercentage = Math.min(100.0, this.attendancePercentage + 1.0);
            } else if (!present && this.attendancePercentage > 0.0) {
                this.attendancePercentage = Math.max(0.0, this.attendancePercentage - 1.0);
            }
        }

        public void setAttendancePercentage(double attendance) {
            if (attendance < 0.0 || attendance > 100.0) {
                throw new IllegalArgumentException("Attendance must be between 0 and 100: " + attendance);
            }
            this.attendancePercentage = attendance;
        }

        public void setGradePointAverage(double gpa) {
            if (gpa < 0.0 || gpa > 10.0) {
                throw new IllegalArgumentException("GPA must be between 0.0 and 10.0: " + gpa);
            }
            this.gradePointAverage = gpa;
        }

        public int getRollNumber() { return rollNumber; }
        public String getStudentName() { return studentName; }
        public double getAttendancePercentage() { return attendancePercentage; }
        public double getGradePointAverage() { return gradePointAverage; }

        @Override
        public String toString() {
            return String.format("Student #%03d (%s) | Attendance: %.1f%% | GPA: %.2f/10.0 | Honors: %s",
                    rollNumber, studentName, attendancePercentage, gradePointAverage,
                    isEligibleForHonors() ? "YES ✓" : "NO");
        }
    }

    // =========================================================================
    // ENTITY 2: Course (Capacity Invariant & Enrollment Behavior)
    // =========================================================================
    public static class Course {
        // STATE
        private final String courseCode;
        private final String courseTitle;
        private final double tuitionFeeInr;
        private final int maxCapacity;
        private final List<Student> enrolledStudents;

        public Course(String courseCode, String courseTitle, double fee, int maxCapacity) {
            this.courseCode = Objects.requireNonNull(courseCode, "courseCode cannot be null");
            this.courseTitle = Objects.requireNonNull(courseTitle, "courseTitle cannot be null");
            if (fee < 0.0) throw new IllegalArgumentException("Fee cannot be negative");
            if (maxCapacity <= 0) throw new IllegalArgumentException("Capacity must be positive");
            this.tuitionFeeInr = fee;
            this.maxCapacity = maxCapacity;
            this.enrolledStudents = new ArrayList<>();
        }

        // BEHAVIOR
        public boolean enrollStudent(Student student) {
            Objects.requireNonNull(student, "student cannot be null");
            if (isFull()) {
                System.out.printf("  [ENROLLMENT FAILED] %s is at full capacity (%d/%d seats filled)%n",
                        this.courseTitle, enrolledStudents.size(), maxCapacity);
                return false;
            }
            enrolledStudents.add(student);
            System.out.printf("  [ENROLLMENT SUCCESS] Enrolled %s into %s (#%03d)%n",
                    student.getStudentName(), this.courseTitle, student.getRollNumber());
            return true;
        }

        public boolean isFull() {
            return enrolledStudents.size() >= maxCapacity;
        }

        public int getRemainingSeats() {
            return maxCapacity - enrolledStudents.size();
        }

        public double calculateTotalCollectedTuitionInr() {
            return enrolledStudents.size() * tuitionFeeInr;
        }

        public String getCourseTitle() { return courseTitle; }
        public List<Student> getEnrolledStudents() { return List.copyOf(enrolledStudents); }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 REAL-WORLD DOMAIN MODELING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. MODELING STUDENT ENTITIES (STATE & BEHAVIOR) ---\n");
        Student s1 = new Student(101, "Swadeep", 92.0, 9.4);
        Student s2 = new Student(102, "Tuhina", 95.0, 9.8);
        Student s3 = new Student(103, "Abhronila", 88.0, 8.7);
        Student s4 = new Student(104, "Debangshu", 82.0, 7.9);

        List<Student> batch = List.of(s1, s2, s3, s4);
        for (Student s : batch) {
            System.out.println("  " + s);
        }

        System.out.println("\n--- 2. MODELING COURSE ENTITY & ENROLLMENT BEHAVIOR ---\n");
        Course javaCourse = new Course("CS-301", "Full Stack Java & Microservices", 25000.0, 3);

        javaCourse.enrollStudent(s1);
        javaCourse.enrollStudent(s2);
        javaCourse.enrollStudent(s3);
        javaCourse.enrollStudent(s4); // Should fail: max capacity is 3!

        System.out.printf("%n  Course Status : %s | Remaining Seats: %d | Total Tuition: ₹%,.2f%n%n",
                javaCourse.getCourseTitle(),
                javaCourse.getRemainingSeats(),
                javaCourse.calculateTotalCollectedTuitionInr());

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Real-world modeling expresses entities as State (fields) and Behavior (methods).");
        System.out.println("2. Validate state transitions (e.g. GPA range 0..10, attendance 0..100) in mutators.");
        System.out.println("3. Behavior methods enforce domain business rules (e.g. course capacity limits).");
        System.out.println("4. Return unmodifiable defensive copies (List.copyOf) to protect internal lists.");
        System.out.println("================================================================================");
    }
}
