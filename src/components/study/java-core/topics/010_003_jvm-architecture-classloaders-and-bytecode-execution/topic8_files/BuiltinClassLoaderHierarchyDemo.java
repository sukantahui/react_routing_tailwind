/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 8: Built-in ClassLoader Hierarchy - 3-Tiered Tree Navigation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

import java.sql.DriverManager;
import java.util.ArrayList;

public class BuiltinClassLoaderHierarchyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: BUILT-IN CLASSLOADER HIERARCHY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Application / System ClassLoader (Our own classes)
        ClassLoader appLoader = BuiltinClassLoaderHierarchyDemo.class.getClassLoader();
        System.out.println("1. App ClassLoader (Our Class)     : " + appLoader);

        // 2. Platform ClassLoader (Parent of AppLoader - Standard extensions/SQL/XML)
        ClassLoader platformLoader = appLoader.getParent();
        System.out.println("2. Platform ClassLoader (Parent)   : " + platformLoader);

        // 3. Bootstrap ClassLoader (Parent of PlatformLoader - Native C++ core / null in Java)
        ClassLoader bootstrapLoader = platformLoader.getParent();
        System.out.println("3. Bootstrap ClassLoader (Root)    : " + bootstrapLoader + " (null represents Bootstrap in Java!)");

        // 4. Verifying Core Java Classes (java.lang.String, ArrayList):
        System.out.println("\n>>> CORE CLASSES LOADED BY BOOTSTRAP CLASSLOADER:");
        System.out.println("  - String.class.getClassLoader()    : " + String.class.getClassLoader() + " (Bootstrap)");
        System.out.println("  - ArrayList.class.getClassLoader() : " + ArrayList.class.getClassLoader() + " (Bootstrap)");

        System.out.println("\n==========================================================================");
    }
}
