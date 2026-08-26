/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 2: The java.io.Serializable Marker Interface: Contract & JVM Verification
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.Serializable;
import java.lang.reflect.Method;

public class SerializableMarkerInterfaceContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.io.Serializable MARKER INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Class<?> serializableClass = Serializable.class;
        Method[] declaredMethods = serializableClass.getDeclaredMethods();

        System.out.println(">>> 1. Inspecting Serializable Interface Source:");
        System.out.println("  Interface Name        : " + serializableClass.getName());
        System.out.println("  Is Interface?         : " + serializableClass.isInterface());
        System.out.println("  Declared Method Count : " + declaredMethods.length + " methods! (Pure Marker Interface!)");

        System.out.println("\n>>> 2. WHAT IS A MARKER INTERFACE?");
        System.out.println("  - A Marker Interface (Tagging Interface) contains ZERO method declarations.");
        System.out.println("  - It acts as a compile-time permission flag / opt-in signal to the JVM.");
        System.out.println("  - When ObjectOutputStream encounters an object, it checks: 'if (obj instanceof Serializable)'.");
        System.out.println("  - If false, it immediately throws 'java.io.NotSerializableException'!");

        System.out.println("\n>>> WHY OPT-IN IS REQUIRED:");
        System.out.println("  - Serializing arbitrarily can leak private passwords, open file handles, database connections, and threads.");
        System.out.println("  - The developer MUST explicitly opt in by adding 'implements Serializable'.");

        System.out.println("\n==========================================================================");
    }
}