/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 6: The Builder Pattern - Fluent Immutable Construction
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class BuilderPatternDemo {

    public static class StudentProfile {
        // All fields immutable:
        private final int id;
        private final String name;
        private final String email;
        private final String center;
        private final double gpa;
        private final boolean scholarshipEligible;

        private StudentProfile(Builder builder) {
            this.id = builder.id;
            this.name = builder.name;
            this.email = builder.email;
            this.center = builder.center;
            this.gpa = builder.gpa;
            this.scholarshipEligible = builder.scholarshipEligible;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private int id;
            private String name;
            private String email;
            private String center = "Barrackpore"; // Default value
            private double gpa;
            private boolean scholarshipEligible;

            public Builder id(int id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder email(String email) { this.email = email; return this; }
            public Builder center(String center) { this.center = center; return this; }
            public Builder gpa(double gpa) { this.gpa = gpa; return this; }
            public Builder scholarshipEligible(boolean eligible) { this.scholarshipEligible = eligible; return this; }

            public StudentProfile build() {
                // Validation before creation:
                if (id <= 0 || name == null || name.isBlank()) {
                    throw new IllegalStateException("Student ID and Name are mandatory!");
                }
                return new StudentProfile(this);
            }
        }

        @Override
        public String toString() {
            return "StudentProfile[id=" + id + ", name=" + name + ", center=" + center + ", gpa=" + gpa + "]";
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: BUILDER PATTERN FLUENT CONSTRUCTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentProfile profile = StudentProfile.builder()
            .id(101)
            .name("Swadeep Paul")
            .email("swadeep@coderaccotax.com")
            .center("Barrackpore")
            .gpa(3.95)
            .scholarshipEligible(true)
            .build();

        System.out.println("Built Immutable Student Profile:
  " + profile);

        System.out.println("\n==========================================================================");
    }
}
