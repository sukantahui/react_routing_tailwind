/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 0: What is Java Reflection? Runtime Metaprogramming
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class WhatIsReflectionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS JAVA REFLECTION? - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // Dynamic inspection of a class at runtime without compile-time direct coupling
        Class<?> clazz = StudentProfile.class;

        System.out.println(">>> 1. BASIC RUNTIME INTROSPECTION:");
        System.out.println("  - Full Class Name   : " + clazz.getName());
        System.out.println("  - Simple Class Name : " + clazz.getSimpleName());
        System.out.println("  - Package Name      : " + clazz.getPackageName());
        System.out.println("  - Superclass        : " + clazz.getSuperclass().getSimpleName());
        System.out.println("  - Is Public?        : " + Modifier.isPublic(clazz.getModifiers()));

        System.out.println("\n>>> 2. DISCOVERING DECLARED METHODS DYNAMICALLY:");
        Method[] methods = clazz.getDeclaredMethods();
        for (Method m : methods) {
            System.out.println("  - Method: " + m.getName() + "() -> Return Type: " + m.getReturnType().getSimpleName());
        }

        System.out.println("\n>>> WHAT REFLECTION ENABLES:");
        System.out.println("  1. Dependency Injection (Spring Framework)");
        System.out.println("  2. Object-Relational Mapping (Hibernate / JPA)");
        System.out.println("  3. JSON Serialization (Jackson / Gson)");
        System.out.println("  4. Automated Testing Runners (JUnit 5)");
        System.out.println("==========================================================================");
    }

    public static class StudentProfile {
        private String name;
        private String center;
        private double score;

        public String getName() { return name; }
        public String getCenter() { return center; }
        public double getScore() { return score; }
        public void setScore(double score) { this.score = score; }
    }
}
