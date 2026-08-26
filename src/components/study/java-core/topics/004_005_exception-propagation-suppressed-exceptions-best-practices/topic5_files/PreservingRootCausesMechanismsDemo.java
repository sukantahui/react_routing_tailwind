/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 5: Preserving Root Causes: 'super(message, cause)' vs 'initCause()'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.IOException;

public class PreservingRootCausesMechanismsDemo {

    // APPROACH 1: Constructor Chaining (Preferred, Cleanest, Immutable):
    public static class ModernChainedException extends Exception {
        public ModernChainedException(String msg, Throwable cause) {
            super(msg, cause);
        }
    }

    // APPROACH 2: Legacy initCause() Method (Used for legacy classes lacking cause constructors):
    public static class LegacyStyleException extends Exception {
        public LegacyStyleException(String msg) {
            super(msg);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: PRESERVING ROOT CAUSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        IOException rootError = new IOException("Barrackpore router interface timeout!");

        // 1. Constructor Chaining:
        ModernChainedException modern = new ModernChainedException("Payment Gateway Unreachable", rootError);
        System.out.println(">>> 1. Constructor Chained Cause : " + modern.getCause().getMessage());

        // 2. initCause() Method (Can be called only ONCE per instance):
        LegacyStyleException legacy = new LegacyStyleException("Account Sync Failed");
        legacy.initCause(rootError);
        System.out.println(">>> 2. initCause() Linked Cause : " + legacy.getCause().getMessage());

        // Attempting to call initCause() a second time triggers IllegalStateException:
        try {
            legacy.initCause(new RuntimeException("Duplicate cause"));
        } catch (IllegalStateException e) {
            System.out.println(">>> 3. [SAFETY GUARD] initCause() can only be called once: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}