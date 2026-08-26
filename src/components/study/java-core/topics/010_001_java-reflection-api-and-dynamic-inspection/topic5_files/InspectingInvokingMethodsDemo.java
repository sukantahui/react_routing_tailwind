/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 5: Inspecting & Invoking Methods Dynamically via method.invoke()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.Method;

public class InspectingInvokingMethodsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: DYNAMIC METHOD INVOCATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        AcademyStudent student = new AcademyStudent("Swadeep Paul", 88.0);
        Class<?> clazz = student.getClass();

        // 1. Invoking a Public Instance Method with Arguments: updateScore(double)
        System.out.println(">>> 1. Invoking Instance Method 'updateScore(double)':");
        Method updateScoreMethod = clazz.getDeclaredMethod("updateScore", double.class);
        updateScoreMethod.invoke(student, 94.5); // Invoked dynamically!
        System.out.println("   - Student score updated dynamically to: " + student.getScore());

        // 2. Invoking a Method that returns a value: generateReport()
        System.out.println("\n>>> 2. Invoking Instance Method 'generateReport()':");
        Method reportMethod = clazz.getDeclaredMethod("generateReport");
        Object reportResult = reportMethod.invoke(student);
        System.out.println("   - Result: " + reportResult);

        // 3. Invoking a STATIC Method (Pass 'null' as target object!):
        System.out.println("\n>>> 3. Invoking Static Method 'getAcademyLocation()':");
        Method staticMethod = clazz.getDeclaredMethod("getAcademyLocation");
        Object locationResult = staticMethod.invoke(null); // Target object is null for static!
        System.out.println("   - Static Location: " + locationResult);

        System.out.println("\n==========================================================================");
    }

    public static class AcademyStudent {
        private final String name;
        private double score;

        public AcademyStudent(String name, double score) {
            this.name = name;
            this.score = score;
        }

        public void updateScore(double newScore) {
            this.score = newScore;
        }

        public String generateReport() {
            return "Student: " + name + " | Final Score: " + score + "%";
        }

        public double getScore() { return score; }

        public static String getAcademyLocation() {
            return "Barrackpore, West Bengal (Coder & AccoTax Hub)";
        }
    }
}
