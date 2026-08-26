/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 6: The Evolution of Metaspace in Java 8 - Goodbye PermGen
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class EvolutionOfMetaspaceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE EVOLUTION OF METASPACE (JAVA 8) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> PERMGEN (JAVA 7 & EARLIER) VS METASPACE (JAVA 8+):");
        System.out.println("  -----------------------------------------------------------------------------");
        System.out.println("  CHARACTERISTIC       PERMGEN (Java 7 and older)    METASPACE (Java 8+)");
        System.out.println("  -----------------------------------------------------------------------------");
        System.out.println("  Memory Location      Inside JVM Heap Boundary       Native OS Process Memory");
        System.out.println("  Default Size         Fixed Default (~64MB-82MB)     Unbounded (grows with RAM)");
        System.out.println("  Resizing             Rigid, frequent OOM crashes    Dynamic expansion");
        System.out.println("  String Constant Pool Stored in PermGen (until Java 7) Moved to Java HEAP");
        System.out.println("  Static Variables     Stored in PermGen              Moved to Java HEAP (Class)");
        System.out.println("  JVM Flags            -XX:MaxPermSize=128m           -XX:MaxMetaspaceSize=256m");
        System.out.println("  -----------------------------------------------------------------------------\n");

        System.out.println(">>> WHY METASPACE WAS A HUGE BREAKTHROUGH:");
        System.out.println("  - Prevented OutOfMemoryError crashes caused by dynamic proxy generation (CGLIB, Spring, Hibernate).");
        System.out.println("  - Simplified JVM tuning for enterprise microservices and cloud containers.");
        System.out.println("==========================================================================");
    }
}
