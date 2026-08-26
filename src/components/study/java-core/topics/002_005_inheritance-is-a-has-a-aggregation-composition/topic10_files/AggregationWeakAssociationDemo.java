/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 10: Aggregation (Weak Association): Lifecycle Independence
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

import java.util.ArrayList;
import java.util.List;

public class AggregationWeakAssociationDemo {

    // Independent Entity: FacultyInstructor
    public static class FacultyInstructor {
        private String name;
        private String subject;

        public FacultyInstructor(String name, String subject) {
            this.name = name;
            this.subject = subject;
        }

        public String getName() { return name; }
        public String getSubject() { return subject; }
    }

    // AGGREGATION: AcademyDepartment HAS-A FacultyInstructors
    // Lifecycle Independence: If AcademyDepartment is destroyed, FacultyInstructor still exists!
    public static class AcademyDepartment {
        private String deptName;
        private List<FacultyInstructor> instructors;

        public AcademyDepartment(String deptName) {
            this.deptName = deptName;
            this.instructors = new ArrayList<>();
        }

        public void assignInstructor(FacultyInstructor instructor) {
            this.instructors.add(instructor);
        }

        public void printFacultyRoster() {
            System.out.println("  [DEPARTMENT] " + deptName + " Faculty Roster:");
            for (FacultyInstructor f : instructors) {
                System.out.printf("    -> %s (%s)\n", f.getName(), f.getSubject());
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: AGGREGATION (WEAK ASSOCIATION) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Create Instructor independently (Lives on Heap outside Department)
        FacultyInstructor sukantaSir = new FacultyInstructor("Sukanta Hui", "Java Core & Spring Boot");

        // 2. Associate with Software Department
        AcademyDepartment csDept = new AcademyDepartment("Computer Science & IT");
        csDept.assignInstructor(sukantaSir);
        csDept.printFacultyRoster();

        // 3. Destroy Department reference
        System.out.println("\n>>> Closing Department (Setting csDept = null)...");
        csDept = null;

        // 4. Sukanta Hui instructor object STILL LIVES independently in memory!
        System.out.println(">>> Verifying Independent Lifecycle of FacultyInstructor:");
        System.out.println("  Instructor still exists independently: " + sukantaSir.getName());

        System.out.println("\n==========================================================================");
    }
}