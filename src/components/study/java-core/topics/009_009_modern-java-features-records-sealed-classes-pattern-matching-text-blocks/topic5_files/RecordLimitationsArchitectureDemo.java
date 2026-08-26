/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 5: Record Limitations & Serialization Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

import java.io.Serializable;

public class RecordLimitationsArchitectureDemo {

    // 1. Valid: Record implementing interfaces (Serializable, Comparable)
    public record SecuredStudentToken(int studentId, String token, long expiryEpoch) implements Serializable {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: RECORD LIMITATIONS & ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 HARD ARCHITECTURAL RULES OF JAVA RECORDS:");
        System.out.println("  1. Cannot extend any class (Records already implicitly extend java.lang.Record).");
        System.out.println("  2. Cannot be extended by any class (Records are implicitly 'final').");
        System.out.println("  3. Cannot declare additional non-static instance fields (All instance state must be in header).");
        System.out.println("  4. Cannot declare native methods.\n");

        System.out.println(">>> SAFE SERIALIZATION ARCHITECTURE:");
        System.out.println("  - Traditional Java serialization bypasses constructors via reflection (a massive security hole).");
        System.out.println("  - Record serialization ALWAYS invokes the Canonical Constructor, guaranteeing invariant validation!");
        System.out.println("==========================================================================");
    }
}
