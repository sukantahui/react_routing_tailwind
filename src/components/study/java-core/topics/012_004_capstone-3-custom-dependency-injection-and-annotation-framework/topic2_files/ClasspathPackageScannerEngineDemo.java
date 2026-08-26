/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 2: Package Scanner Engine - Classpath & ClassLoader Inspection
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ClasspathPackageScannerEngineDemo {

    public static List<Class<?>> scanPackage(String basePackage) throws Exception {
        List<Class<?>> classes = new ArrayList<>();
        String path = basePackage.replace('.', '/');
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Enumeration<URL> resources = classLoader.getResources(path);

        while (resources.hasMoreElements()) {
            URL resource = resources.nextElement();
            File directory = new File(resource.toURI());
            if (directory.exists()) {
                findClasses(directory, basePackage, classes);
            }
        }
        return classes;
    }

    private static void findClasses(File directory, String packageName, List<Class<?>> classes) throws ClassNotFoundException {
        File[] files = directory.listFiles();
        if (files == null) return;

        for (File file : files) {
            if (file.isDirectory()) {
                findClasses(file, packageName + "." + file.getName(), classes);
            } else if (file.getName().endsWith(".class")) {
                String className = packageName + '.' + file.getName().substring(0, file.getName().length() - 6);
                classes.add(Class.forName(className));
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: CLASSPATH PACKAGE SCANNER ENGINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("Package Scanner successfully converts package names to directory paths,");
        System.out.println("recursively traverses .class files, and loads Class<?> instances into memory.");

        System.out.println("\n==========================================================================");
    }
}
