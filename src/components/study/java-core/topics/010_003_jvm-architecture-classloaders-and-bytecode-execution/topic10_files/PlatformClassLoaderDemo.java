/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 10: The Platform ClassLoader (Java 9+ Standard)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

import java.sql.Driver;
import java.sql.DriverManager;

public class PlatformClassLoaderDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: THE PLATFORM CLASSLOADER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Obtaining the Platform ClassLoader directly in Java 9+:
        ClassLoader platformLoader = ClassLoader.getPlatformClassLoader();
        System.out.println("1. ClassLoader.getPlatformClassLoader() : " + platformLoader);

        // 2. Classes loaded by the Platform ClassLoader (e.g. java.sql.Driver):
        System.out.println("\n>>> 2. CLASSES LOADED BY PLATFORM CLASSLOADER:");
        System.out.println("  - java.sql.Driver.class ClassLoader   : " + Driver.class.getClassLoader());

        System.out.println("\n>>> WHY EXTENSION CLASSLOADER WAS REPLACED IN JAVA 9:");
        System.out.println("  1. The old extension directory ($JAVA_HOME/jre/lib/ext) allowed accidental classpath clashes.");
        System.out.println("  2. In Java 9, JPMS modules (java.sql, java.xml, java.desktop) are loaded cleanly via PlatformClassLoader.");
        System.out.println("==========================================================================");
    }
}
