/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 1: What is an Abstract Class: Definition, Syntax & 'abstract' Keyword
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractClassSyntaxDemo {

    // ABSTRACT CLASS: Declared using 'abstract' modifier
    public abstract static class CourseCurriculum {
        protected String courseTitle;
        protected int durationHours;

        public CourseCurriculum(String title, int hours) {
            this.courseTitle = title;
            this.durationHours = hours;
        }

        // Abstract method: Signature only
        public abstract void conductFinalAssessment();

        // Concrete method: Fully implemented logic
        public void printCurriculumSummary() {
            System.out.printf("  [CURRICULUM] %s (%d Total Hours)\n", courseTitle, durationHours);
        }
    }

    // Concrete Subclass
    public static class FullStackJavaCurriculum extends CourseCurriculum {
        public FullStackJavaCurriculum() {
            super("Full Stack Java & Spring Boot", 180);
        }

        @Override
        public void conductFinalAssessment() {
            System.out.println("  [ASSESSMENT] Full Stack Capstone: Building Multi-tier Banking App with Spring & React!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: ABSTRACT CLASS SYNTAX & STRUCTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CourseCurriculum curriculum = new FullStackJavaCurriculum();
        curriculum.printCurriculumSummary();
        curriculum.conductFinalAssessment();

        System.out.println("\n==========================================================================");
    }
}