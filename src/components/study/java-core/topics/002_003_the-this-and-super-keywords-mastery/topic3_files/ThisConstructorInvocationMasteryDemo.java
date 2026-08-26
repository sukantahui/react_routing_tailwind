/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 3: Using 'this()' to Invoke Overloaded Constructors in the Same Class
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ThisConstructorInvocationMasteryDemo {

    public static class CourseModule {
        private String moduleCode;
        private String moduleTitle;
        private int durationWeeks;

        // 1-Arg Constructor
        public CourseModule(String moduleCode) {
            this(moduleCode, "Core Foundations", 4); // Chaining to 3-arg constructor
        }

        // 2-Arg Constructor
        public CourseModule(String moduleCode, String moduleTitle) {
            this(moduleCode, moduleTitle, 6); // Chaining to 3-arg constructor
        }

        // 3-Arg Master Constructor
        public CourseModule(String moduleCode, String moduleTitle, int durationWeeks) {
            this.moduleCode = moduleCode;
            this.moduleTitle = moduleTitle;
            this.durationWeeks = durationWeeks;
            System.out.printf("  [MASTER CONSTRUCTOR] %s: '%s' (%d weeks)\n", moduleCode, moduleTitle, durationWeeks);
        }

        public void printInfo() {
            System.out.printf("  -> [%s] %s (%d Weeks)\n", moduleCode, moduleTitle, durationWeeks);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: this() CONSTRUCTOR INVOCATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CourseModule m1 = new CourseModule("MOD-101");
        m1.printInfo();

        CourseModule m2 = new CourseModule("MOD-102", "Advanced JVM Internals");
        m2.printInfo();

        CourseModule m3 = new CourseModule("MOD-103", "Full Stack Spring Boot", 12);
        m3.printInfo();

        System.out.println("\n==========================================================================");
    }
}