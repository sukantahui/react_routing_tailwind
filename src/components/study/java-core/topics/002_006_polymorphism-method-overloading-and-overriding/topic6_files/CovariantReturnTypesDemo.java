/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 6: Return Type Rules in Overriding: Covariant Return Types (Java 5+)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class CovariantReturnTypesDemo {

    // Base Entity & Subtype Entity
    public static class Person {
        public String getRole() { return "General Person"; }
    }

    public static class TraineeDeveloper extends Person {
        @Override
        public String getRole() { return "Certified Java Specialist"; }
    }

    // Factory Service with Covariant Return
    public static class AcademyEnrollmentService {
        // Parent method returns general 'Person'
        public Person recruitCandidate() {
            System.out.println("  [BASE SERVICE] Recruiting general Person...");
            return new Person();
        }
    }

    public static class AdvancedCloudEnrollmentService extends AcademyEnrollmentService {
        // COVARIANT RETURN: Child method returns specialized subtype 'TraineeDeveloper'!
        // Valid because TraineeDeveloper IS-A Person!
        @Override
        public TraineeDeveloper recruitCandidate() {
            System.out.println("  [SPECIALIZED SERVICE] Recruiting specialized TraineeDeveloper!");
            return new TraineeDeveloper();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: COVARIANT RETURN TYPES IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AdvancedCloudEnrollmentService service = new AdvancedCloudEnrollmentService();

        // No explicit type casting required by the caller!
        TraineeDeveloper developer = service.recruitCandidate();
        System.out.println("  Candidate Role: " + developer.getRole());

        System.out.println("\n==========================================================================");
    }
}