/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 11: The Application ClassLoader - System Classpath & User Code
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class ApplicationClassLoaderDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: THE APPLICATION CLASSLOADER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Obtaining the System / Application ClassLoader:
        ClassLoader sysLoader = ClassLoader.getSystemClassLoader();
        System.out.println("1. System ClassLoader : " + sysLoader);

        // 2. ClassLoader of our own class:
        ClassLoader ourLoader = ApplicationClassLoaderDemo.class.getClassLoader();
        System.out.println("2. Our ClassLoader    : " + ourLoader);
        System.out.println("   - Is sysLoader == ourLoader? " + (sysLoader == ourLoader));

        // 3. Inspecting java.class.path:
        System.out.println("\n>>> 3. RUNTIME CLASSPATH (java.class.path):");
        String classPath = System.getProperty("java.class.path");
        String[] entries = classPath.split(";"); // Semicolon for Windows
        for (String entry : entries) {
            System.out.println("   - " + entry);
        }

        System.out.println("\n==========================================================================");
    }
}
