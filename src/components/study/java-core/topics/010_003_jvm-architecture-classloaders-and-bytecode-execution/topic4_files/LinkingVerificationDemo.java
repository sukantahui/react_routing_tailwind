/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 4: Linking Step 1 - Verification & Bytecode Verifier
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class LinkingVerificationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: LINKING STEP 1 - VERIFICATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 PASSES OF BYTECODE VERIFICATION:");
        System.out.println("  Pass 1 (File Format Check): Validates 0xCAFEBABE magic number, major/minor versions.");
        System.out.println("  Pass 2 (Semantic Analysis): Checks final class restrictions, superclass validity.");
        System.out.println("  Pass 3 (Bytecode Verification): Data-flow analysis, stack map frame checks, operand types.");
        System.out.println("  Pass 4 (Symbolic Reference Check): Verifies target methods/fields exist during resolution.\n");

        System.out.println(">>> VERIFICATION FAILURE EXCEPTION:");
        System.out.println("  - If bytecode tampering or corruption is detected, JVM throws: 'java.lang.VerifyError'.");
        System.out.println("  - Disabling verification in production is strongly discouraged ('-Xverify:none').");
        System.out.println("==========================================================================");
    }
}
