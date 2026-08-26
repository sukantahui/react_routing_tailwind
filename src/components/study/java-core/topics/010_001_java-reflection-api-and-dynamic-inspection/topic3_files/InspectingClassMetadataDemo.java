/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 3: Inspecting Class Metadata - Superclasses, Interfaces & Modifiers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.io.Serializable;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class InspectingClassMetadataDemo {

    public interface Identifiable { int getId(); }
    public interface Evaluated { double getScore(); }

    public static abstract class BaseEntity {
        protected long createdEpoch = System.currentTimeMillis();
    }

    public static final class AcademyStudentRecord extends BaseEntity implements Identifiable, Evaluated, Serializable {
        private final int id = 101;
        private final String name = "Swadeep Paul";
        private final double score = 94.0;

        @Override public int getId() { return id; }
        @Override public double getScore() { return score; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: INSPECTING CLASS METADATA - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Class<?> clazz = AcademyStudentRecord.class;

        // 1. Inspecting Modifiers
        int modifiers = clazz.getModifiers();
        System.out.println("1. Class Modifiers (Bitmask: " + modifiers + "):");
        System.out.println("   - Modifier String : " + Modifier.toString(modifiers));
        System.out.println("   - Is Public?      : " + Modifier.isPublic(modifiers));
        System.out.println("   - Is Final?       : " + Modifier.isFinal(modifiers));
        System.out.println("   - Is Abstract?    : " + Modifier.isAbstract(modifiers));

        // 2. Superclass Hierarchy Navigation
        System.out.println("\n2. Superclass Hierarchy:");
        Class<?> current = clazz;
        while (current != null) {
            System.out.println("   --> " + current.getName());
            current = current.getSuperclass();
        }

        // 3. Implemented Interfaces
        System.out.println("\n3. Implemented Interfaces:");
        Class<?>[] interfaces = clazz.getInterfaces();
        for (Class<?> iface : interfaces) {
            System.out.println("   - Interface: " + iface.getSimpleName());
        }

        System.out.println("\n==========================================================================");
    }
}
