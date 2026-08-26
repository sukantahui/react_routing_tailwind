/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 14: Thread Context ClassLoaders (TCCL) - SPI & JDBC Dynamic Resolution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class ThreadContextClassLoadersDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: THREAD CONTEXT CLASSLOADERS (TCCL) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Inspecting Thread Context ClassLoader of current executing thread:
        ClassLoader tccl = Thread.currentThread().getContextClassLoader();
        System.out.println("1. Thread Context ClassLoader (TCCL) : " + tccl);

        System.out.println("\n>>> THE SERVICE PROVIDER INTERFACE (SPI) DILEMMA:");
        System.out.println("  - Problem: Core Java class (e.g. java.sql.DriverManager) is loaded by Bootstrap/Platform loader.");
        System.out.println("  - Bootstrap loader CANNOT see database drivers (e.g. com.mysql.cj.jdbc.Driver) on App classpath!");
        System.out.println("  - Solution: TCCL allows DriverManager to reach DOWN into the Application ClassLoader to load drivers!\n");

        // 2. Setting a custom TCCL for plugin thread execution:
        Thread worker = new Thread(() -> {
            ClassLoader workerTccl = Thread.currentThread().getContextClassLoader();
            System.out.println("2. Worker Thread running with TCCL: " + workerTccl.getClass().getSimpleName());
        });
        worker.setContextClassLoader(tccl);
        worker.start();

        System.out.println("==========================================================================");
    }
}
