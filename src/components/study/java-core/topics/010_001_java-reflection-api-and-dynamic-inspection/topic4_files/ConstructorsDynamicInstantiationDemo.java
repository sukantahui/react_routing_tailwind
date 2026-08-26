/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 4: Constructors & Dynamic Instantiation via getDeclaredConstructor().newInstance()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.Constructor;
import java.util.Arrays;

public class ConstructorsDynamicInstantiationDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: DYNAMIC INSTANTIATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Class<StudentProfile> clazz = StudentProfile.class;

        // 1. Inspecting All Constructors: getConstructors() [public only] vs getDeclaredConstructors() [all]
        System.out.println(">>> 1. Inspecting Declared Constructors:");
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        for (Constructor<?> c : constructors) {
            System.out.println("   - Constructor: " + c.getName() + "(" + Arrays.toString(c.getParameterTypes()) + ")");
        }

        // 2. Dynamic Instantiation via Default No-Arg Constructor:
        System.out.println("\n>>> 2. Instantiating via No-Arg Constructor:");
        Constructor<StudentProfile> noArgConstructor = clazz.getDeclaredConstructor();
        StudentProfile student1 = noArgConstructor.newInstance();
        System.out.println("   Created Object 1: " + student1);

        // 3. Dynamic Instantiation via Parameterized Constructor (String, String, double):
        System.out.println("\n>>> 3. Instantiating via Parameterized Constructor (String, String, double):");
        Constructor<StudentProfile> paramConstructor = clazz.getDeclaredConstructor(String.class, String.class, double.class);
        StudentProfile student2 = paramConstructor.newInstance("Swadeep Paul", "Barrackpore", 94.5);
        System.out.println("   Created Object 2: " + student2);

        System.out.println("\n>>> WHY clazz.newInstance() WAS DEPRECATED IN JAVA 9:");
        System.out.println("  1. clazz.newInstance() bypassed compile-time checked exception checks.");
        System.out.println("  2. clazz.getDeclaredConstructor().newInstance() properly wraps target exceptions inside InvocationTargetException.");
        System.out.println("==========================================================================");
    }

    public static class StudentProfile {
        private String name;
        private String center;
        private double score;

        // No-arg constructor
        public StudentProfile() {
            this.name = "Guest Student";
            this.center = "Barrackpore";
            this.score = 0.0;
        }

        // Parameterized constructor
        public StudentProfile(String name, String center, double score) {
            this.name = name;
            this.center = center;
            this.score = score;
        }

        @Override
        public String toString() {
            return "StudentProfile[name=" + name + ", center=" + center + ", score=" + score + "%]";
        }
    }
}
