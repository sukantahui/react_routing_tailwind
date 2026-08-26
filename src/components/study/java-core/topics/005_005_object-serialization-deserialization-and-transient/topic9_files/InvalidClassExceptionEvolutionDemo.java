/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 9: java.io.InvalidClassException: Class Definition Evolution & UID Mismatch
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InvalidClassException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class EvolvingUserProfile implements Serializable {
    // Current Version in Source Code:
    private static final long serialVersionUID = 200L;

    private final String userName;

    public EvolvingUserProfile(String name) { this.userName = name; }
}

public class InvalidClassExceptionEvolutionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: InvalidClassException FORENSICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EvolvingUserProfile profile = new EvolvingUserProfile("Swadeep Paul");

        // 1. Serialize object with UID = 200L:
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            oos.writeObject(profile);
        } catch (Exception e) { e.printStackTrace(); }

        byte[] serializedBytes = byteBuffer.toByteArray();

        // 2. Corrupting serialized byte stream's UID bytes (simulating reading bytes from an older UID = 100L):
        // In serialized format, serialVersionUID is located at bytes 23-30:
        serializedBytes[29] = (byte) 0x64; // Changes 200L to 100L

        System.out.println(">>> 1. Attempting to deserialize byte stream with UID Mismatch:");
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(serializedBytes))) {
            EvolvingUserProfile restored = (EvolvingUserProfile) ois.readObject();
            System.out.println("  Restored: " + restored);
        } catch (InvalidClassException ice) {
            System.out.println("  [CAUGHT InvalidClassException]");
            System.out.println("  Class Name       : " + ice.classname);
            System.out.println("  Diagnostic Message: " + ice.getMessage());
        } catch (Exception e) {
            System.out.println("  [ERROR] " + e);
        }

        System.out.println("\n>>> HOW TO EVOLVE CLASSES SAFELY WITHOUT BREAKING UID:");
        System.out.println("  1. Compatible Changes: Adding new fields (they receive default null/0 values in old streams).");
        System.out.println("  2. Incompatible Changes: Deleting fields, changing inheritance hierarchies, or modifying field types.");
        System.out.println("  3. Keep 'serialVersionUID' constant if changes are backward-compatible!");

        System.out.println("\n==========================================================================");
    }
}