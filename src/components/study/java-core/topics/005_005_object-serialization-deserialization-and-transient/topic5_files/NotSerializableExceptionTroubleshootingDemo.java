/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 5: java.io.NotSerializableException: Root Causes & Troubleshooting Unserializable References
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayOutputStream;
import java.io.NotSerializableException;
import java.io.ObjectOutputStream;
import java.io.Serializable;

// Non-Serializable Helper Class (e.g. Third-party library class or runtime thread):
class LiveDatabaseConnection {
    private final String dbUrl = "jdbc:postgresql://localhost:5432/barrackpore_db";
}

// Serializable Class holding a Non-Serializable field reference:
class UnsafeUserProfile implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String userName = "Swadeep Paul";
    private final LiveDatabaseConnection connection = new LiveDatabaseConnection(); // FAILS SERIALIZATION!
}

public class NotSerializableExceptionTroubleshootingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: NotSerializableException FORENSICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        UnsafeUserProfile profile = new UnsafeUserProfile();

        try {
            ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
            try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
                oos.writeObject(profile); // EXPLODES at runtime!
            }
        } catch (NotSerializableException nse) {
            System.out.println(">>> 1. CAUGHT NotSerializableException:");
            System.out.println("  Offending Class Name : " + nse.getMessage());
            System.out.println("  Exception Type       : " + nse.getClass().getName());

            System.out.println("\n>>> 2. HOW TO RESOLVE NotSerializableException IN 3 WAYS:");
            System.out.println("  Solution 1: Make the offending class implement 'Serializable'.");
            System.out.println("  Solution 2: Mark the offending field as 'transient' (e.g. 'private transient LiveDatabaseConnection conn;').");
            System.out.println("  Solution 3: Implement custom 'writeObject()' and 'readObject()' methods.");
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("\n==========================================================================");
    }
}