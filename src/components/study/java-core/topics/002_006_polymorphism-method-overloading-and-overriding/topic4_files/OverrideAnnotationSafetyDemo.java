/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 4: The @Override Annotation: Compiler Verification & Safety
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class OverrideAnnotationSafetyDemo {

    public static class DatabaseConnector {
        public void connectToCluster(String host, int port) {
            System.out.printf("  [PARENT] Connecting to %s:%d\n", host, port);
        }
    }

    public static class SecureSslConnector extends DatabaseConnector {
        // @Override FORCES the Java compiler to verify that this method matches a parent signature!
        // If you make a typo (e.g. 'connectToClustr'), javac flags an immediate COMPILE ERROR!
        @Override
        public void connectToCluster(String host, int port) {
            System.out.printf("  [CHILD SSL] Secure TLS 1.3 encrypted connection to %s:%d established!\n", host, port);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE @Override ANNOTATION SAFETY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DatabaseConnector connector = new SecureSslConnector();
        connector.connectToCluster("db.barrackpore.internal", 3306);

        System.out.println("\n==========================================================================");
    }
}