/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 0: The Concept of Abstraction: Hiding Implementation Details
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractionConceptFoundationsDemo {

    // Abstract Class: Hides internal complexity of biometric authentication
    public abstract static class BiometricTerminalAuth {
        protected String terminalLocation;

        public BiometricTerminalAuth(String location) {
            this.terminalLocation = location;
        }

        // ABSTRACT METHOD: What to do (contract), NOT how to do it
        public abstract boolean verifyIdentity(String traineeId, byte[] biometricSample);

        // CONCRETE METHOD: Common interface exposed to caller
        public void authenticateAndAdmit(String traineeId, byte[] sample) {
            System.out.println("  [TERMINAL " + terminalLocation + "] Initiating identity verification for " + traineeId);
            boolean verified = verifyIdentity(traineeId, sample);
            if (verified) {
                System.out.println("  [ACCESS GRANTED] Door unlocked at " + terminalLocation);
            } else {
                System.out.println("  [ACCESS DENIED] Biometric mismatch at " + terminalLocation);
            }
        }
    }

    // Concrete Implementation: Fingerprint Scanner
    public static class FingerprintScanner extends BiometricTerminalAuth {
        public FingerprintScanner(String location) { super(location); }

        @Override
        public boolean verifyIdentity(String traineeId, byte[] sample) {
            System.out.println("  [FINGERPRINT HARDWARE] Optical scanning ridges & minutiae points...");
            return sample != null && sample.length > 0;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE CONCEPT OF ABSTRACTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BiometricTerminalAuth terminal = new FingerprintScanner("Barrackpore Hub Lab-1");
        byte[] dummyFingerprint = new byte[]{1, 2, 3, 4};

        terminal.authenticateAndAdmit("Swadeep-101", dummyFingerprint);

        System.out.println("\n==========================================================================");
    }
}