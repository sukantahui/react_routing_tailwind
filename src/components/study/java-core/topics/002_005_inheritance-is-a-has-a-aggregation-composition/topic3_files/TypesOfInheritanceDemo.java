/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 3: Types of Inheritance in Java: Single, Multilevel & Hierarchical
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class TypesOfInheritanceDemo {

    // 1. Root Base Class
    public static class Person {
        protected String name;
        public Person(String name) { this.name = name; }
    }

    // 2. SINGLE INHERITANCE: Trainee IS-A Person
    public static class Trainee extends Person {
        protected int roll;
        public Trainee(String name, int roll) {
            super(name);
            this.roll = roll;
        }
    }

    // 3. MULTILEVEL INHERITANCE: AdvancedJavaTrainee IS-A Trainee IS-A Person
    public static class AdvancedJavaTrainee extends Trainee {
        private String projectTitle;
        public AdvancedJavaTrainee(String name, int roll, String projectTitle) {
            super(name, roll);
            this.projectTitle = projectTitle;
        }

        public void printMultilevel() {
            System.out.printf("  [MULTILEVEL] %s (Roll %d) working on project: '%s'\n", name, roll, projectTitle);
        }
    }

    // 4. HIERARCHICAL INHERITANCE: Instructor IS-A Person (Sibling of Trainee)
    public static class Instructor extends Person {
        private String expertise;
        public Instructor(String name, String expertise) {
            super(name);
            this.expertise = expertise;
        }

        public void printHierarchical() {
            System.out.printf("  [HIERARCHICAL] Instructor: %s | Domain: %s\n", name, expertise);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: TYPES OF INHERITANCE IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Multilevel Hierarchy (Person -> Trainee -> AdvancedJavaTrainee):");
        AdvancedJavaTrainee swadeep = new AdvancedJavaTrainee("Swadeep Paul", 101, "Banking Transaction Engine");
        swadeep.printMultilevel();

        System.out.println("\n>>> 2. Hierarchical Inheritance (Person -> Instructor):");
        Instructor mentor = new Instructor("Sukanta Hui", "Full Stack Java & JVM Internals");
        mentor.printHierarchical();

        System.out.println("\n==========================================================================");
    }
}