/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 5: Native Method Stack - Supporting JNI C/C++ Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class NativeMethodStackDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: NATIVE METHOD STACK (JNI) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. EXECUTING FAMOUS NATIVE METHODS IN CORE JAVA:");

        // Native method: public static native long currentTimeMillis();
        long now = System.currentTimeMillis();
        System.out.println("  - System.currentTimeMillis() [Native C] : " + now);

        // Native method: public static native int identityHashCode(Object x);
        Object obj = new Object();
        int rawHash = System.identityHashCode(obj);
        System.out.println("  - System.identityHashCode()   [Native C] : " + rawHash);

        System.out.println("\n>>> HOW THE NATIVE METHOD STACK OPERATES:");
        System.out.println("  1. When a thread calls a 'native' method, JVM leaves the Java Stack Frame.");
        System.out.println("  2. JVM pushes a Native Stack Frame onto the Native Method Stack (C calling convention).");
        System.out.println("  3. Native code executes directly on the OS CPU (using OS C compiler conventions).");
        System.out.println("  4. Once C function finishes, result is passed back to Java Stack and execution resumes.");
        System.out.println("==========================================================================");
    }
}
