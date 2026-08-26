/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 2: Obtaining java.lang.Class Instances - The 3 Primary Techniques
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

public class ObtainingClassInstancesDemo {

    public static void main(String[] args) throws ClassNotFoundException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: OBTAINING CLASS INSTANCES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // --- TECHNIQUE 1: Class Literal (.class syntax - Compile-Time Known) ---
        Class<Student> c1 = Student.class;
        System.out.println("1. Via Class Literal (Student.class)     : " + c1.getName());

        // --- TECHNIQUE 2: Object.getClass() (Runtime Instance Available) ---
        Student studentInstance = new Student(101, "Swadeep Paul");
        Class<? extends Student> c2 = studentInstance.getClass();
        System.out.println("2. Via object.getClass()                 : " + c2.getName());

        // --- TECHNIQUE 3: Class.forName(String fullyQualifiedName) (Dynamic Plugin Loading) ---
        Class<?> c3 = Class.forName("com.coderaccotax.javatutorial.reflection.ObtainingClassInstancesDemo$Student");
        System.out.println("3. Via Class.forName('...Student')       : " + c3.getName());

        // Verifying that ALL 3 techniques reference the EXACT SAME Metaspace Class Singleton:
        System.out.println("\n>>> SINGLETON VERIFICATION:");
        System.out.println("  - c1 == c2 : " + (c1 == c2) + " (Exact same Class instance!)");
        System.out.println("  - c2 == c3 : " + (c2 == c3) + " (Exact same Class instance!)");

        // --- SPECIAL CASES: Primitives & Arrays ---
        Class<?> intPrimitiveClass = int.class; // Or Integer.TYPE
        Class<?> stringArrayClass = String[].class;
        System.out.println("\n>>> SPECIAL CLASS OBJECTS:");
        System.out.println("  - int.class name          : " + intPrimitiveClass.getName());
        System.out.println("  - String[].class name     : " + stringArrayClass.getName());

        System.out.println("\n==========================================================================");
    }

    public static class Student {
        private final int id;
        private final String name;
        public Student(int id, String name) { this.id = id; this.name = name; }
    }
}
