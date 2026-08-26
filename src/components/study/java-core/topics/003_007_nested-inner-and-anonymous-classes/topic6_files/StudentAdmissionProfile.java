/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 6: When to Choose Static Nested Classes: The Builder Pattern & Map.Entry Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class StudentAdmissionProfile {

    private final String studentName;
    private final String enrollmentId;
    private final String courseName;
    private final double scholarshipPercent;

    // Private constructor called strictly by the Static Nested Builder:
    private StudentAdmissionProfile(Builder builder) {
        this.studentName = builder.studentName;
        this.enrollmentId = builder.enrollmentId;
        this.courseName = builder.courseName;
        this.scholarshipPercent = builder.scholarshipPercent;
    }

    // STATIC NESTED CLASS: The Builder Pattern
    public static class Builder {
        private String studentName;
        private String enrollmentId;
        private String courseName;
        private double scholarshipPercent;

        public Builder setStudentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public Builder setEnrollmentId(String enrollmentId) {
            this.enrollmentId = enrollmentId;
            return this;
        }

        public Builder setCourseName(String courseName) {
            this.courseName = courseName;
            return this;
        }

        public Builder setScholarshipPercent(double scholarshipPercent) {
            this.scholarshipPercent = scholarshipPercent;
            return this;
        }

        public StudentAdmissionProfile build() {
            return new StudentAdmissionProfile(this);
        }
    }

    @Override
    public String toString() {
        return String.format("Student[ID=%s, Name=%s, Course=%s, Scholarship=%.1f%%]",
                enrollmentId, studentName, courseName, scholarshipPercent);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: STATIC NESTED BUILDER PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Constructing immutable StudentProfile using Fluent Static Builder:
        StudentAdmissionProfile profile = new StudentAdmissionProfile.Builder()
                .setStudentName("Swadeep Paul")
                .setEnrollmentId("BKP-2026-001")
                .setCourseName("Java Core & Spring Microservices")
                .setScholarshipPercent(25.0)
                .build();

        System.out.println(">>> Constructed Immutable Student Profile via Static Nested Builder:");
        System.out.println("  " + profile);

        System.out.println("\n==========================================================================");
    }
}