/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 15: Metaspace Sizing Flags - -XX:MetaspaceSize & -XX:MaxMetaspaceSize
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class MetaspaceSizingFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: METASPACE SIZING FLAGS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE TWO CRITICAL METASPACE FLAGS:");
        System.out.println("  1. -XX:MetaspaceSize=<size> (Default: ~21MB):");
        System.out.println("     - Sets the INITIAL high-watermark threshold.");
        System.out.println("     - When loaded classes cross this threshold, JVM triggers a FULL GC.");
        System.out.println("     - Tuning: Set to 128m or 256m for Spring Boot apps to eliminate startup Full GCs!\n");

        System.out.println("  2. -XX:MaxMetaspaceSize=<size> (Default: Unbounded):");
        System.out.println("     - Sets the ABSOLUTE UPPER CEILING for Metaspace.");
        System.out.println("     - Tuning: Set to 256m or 512m in Docker/Kubernetes to prevent container cgroup crashes.\n");

        System.out.println(">>> PRODUCTION COMMAND LINE:");
        System.out.println("  - java -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -jar spring-app.jar");
        System.out.println("==========================================================================");
    }
}
