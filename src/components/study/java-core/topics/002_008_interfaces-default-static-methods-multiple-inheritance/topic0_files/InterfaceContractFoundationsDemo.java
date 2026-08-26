/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 0: What is an Interface: 100% Abstract Contract and Blueprint of Behavior
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class InterfaceContractFoundationsDemo {

    // INTERFACE: 100% abstract contract specifying capabilities
    public interface AcademicExaminer {
        // Method contract: WHAT to do, completely decoupled from HOW
        void conductPracticalAssessment(String traineeName, String projectModule);
        int calculateScore(int rawMarks, int attendanceBonus);
    }

    // Concrete class fulfilling the contract
    public static class JavaSpecialistExaminer implements AcademicExaminer {
        @Override
        public void conductPracticalAssessment(String traineeName, String projectModule) {
            System.out.printf("  [EXAM LAB] Assessing %s on '%s' in Barrackpore terminal sandbox.\n",
                    traineeName, projectModule);
        }

        @Override
        public int calculateScore(int rawMarks, int attendanceBonus) {
            return rawMarks + attendanceBonus;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS AN INTERFACE IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicExaminer examiner = new JavaSpecialistExaminer();
        examiner.conductPracticalAssessment("Swadeep Paul", "Spring Boot Cloud Architecture");
        int finalScore = examiner.calculateScore(90, 5);

        System.out.println("  -> Final Assessed Score: " + finalScore + "/100");

        System.out.println("\n==========================================================================");
    }
}