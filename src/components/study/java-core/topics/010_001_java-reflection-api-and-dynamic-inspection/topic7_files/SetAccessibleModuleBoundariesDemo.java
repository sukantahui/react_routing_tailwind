/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 7: Breaking Encapsulation - setAccessible(true) & Java 9+ Module Boundaries
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.Field;
import java.lang.reflect.InaccessibleObjectException;

public class SetAccessibleModuleBoundariesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: SETACCESSIBLE & MODULE BOUNDARIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Legal setAccessible within the application's own classes:
        PrivateStudent secret = new PrivateStudent("SECRET_TOKEN_7749");
        try {
            Field tokenField = PrivateStudent.class.getDeclaredField("secretToken");
            tokenField.setAccessible(true); // Suppress access check on our own class
            System.out.println("1. Successfully accessed private token: " + tokenField.get(secret));
        } catch (Exception ex) {
            System.err.println("1. Error: " + ex.getMessage());
        }

        // 2. Attempting setAccessible on JDK Internal Modules (Java 9+ Strong Encapsulation):
        System.out.println("\n>>> 2. ATTEMPTING DEEP REFLECTION ON JDK INTERNALS (e.g. String.value):");
        try {
            Field stringValueField = String.class.getDeclaredField("value");
            stringValueField.setAccessible(true); // Illegal in Java 17+ without --add-opens!
            System.out.println("   Accessed String.value byte array!");
        } catch (InaccessibleObjectException ex) {
            System.err.println("   [JPMS STRONG ENCAPSULATION ENFORCED]:");
            System.err.println("   " + ex.getClass().getSimpleName() + ": " + ex.getMessage());
            System.out.println("   --> Java Platform Module System (JPMS) prevents illegal reflective access to JDK internals!");
        } catch (NoSuchFieldException ex) {
            System.err.println("   Field not found: " + ex.getMessage());
        }

        System.out.println("\n==========================================================================");
    }

    static class PrivateStudent {
        private final String secretToken;
        public PrivateStudent(String token) { this.secretToken = token; }
    }
}
