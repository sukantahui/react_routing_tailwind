/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 2: Anatomy of a Record - Components & Reflection
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

import java.lang.reflect.RecordComponent;
import java.util.Arrays;

public class AnatomyOfRecordDemo {

    public record CourseInfo(String code, String title, int durationWeeks, double fee) {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: ANATOMY OF A RECORD - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        CourseInfo course = new CourseInfo("JAVA-PRO", "Java Core to Pro", 12, 4500.0);

        // 1. Inspecting Record Class Hierarchy via Reflection
        Class<?> clazz = course.getClass();
        System.out.println("1. Class Hierarchy:");
        System.out.println("   - Class Name       : " + clazz.getName());
        System.out.println("   - Superclass       : " + clazz.getSuperclass().getName() + " (java.lang.Record!)");
        System.out.println("   - isRecord()       : " + clazz.isRecord() + " (Java 16+ reflection method)");

        // 2. Inspecting Record Components dynamically
        System.out.println("\n2. Record Components (Metadata introspection):");
        RecordComponent[] components = clazz.getRecordComponents();
        for (RecordComponent rc : components) {
            System.out.println("   - Component: " + rc.getName() + " [Type: " + rc.getType().getSimpleName() + ", Accessor: " + rc.getAccessor().getName() + "()]");
        }

        System.out.println("\n==========================================================================");
    }
}
