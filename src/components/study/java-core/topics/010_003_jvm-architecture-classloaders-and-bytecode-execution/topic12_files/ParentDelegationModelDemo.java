/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 12: The Parent-Delegation Model - Upward Request Flow
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class ParentDelegationModelDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: THE PARENT-DELEGATION MODEL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW CLASS LOADING DELEGATION OPERATES STEP-BY-STEP:");
        System.out.println("  1. AppClassLoader receives request to load 'java.lang.String'.");
        System.out.println("  2. AppClassLoader checks its cache. If not found, delegates up to PlatformClassLoader.");
        System.out.println("  3. PlatformClassLoader checks cache. If not found, delegates up to BootstrapClassLoader.");
        System.out.println("  4. BootstrapClassLoader searches 'java.base' and finds 'java.lang.String'.");
        System.out.println("  5. BootstrapClassLoader loads and returns the Class object.");
        System.out.println("  6. AppClassLoader and PlatformClassLoader do NOT attempt to search locally!\n");

        System.out.println(">>> CORE BENEFITS OF PARENT-DELEGATION:");
        System.out.println("  - Single Namespace Guarantee : Prevents duplicate class definitions in memory.");
        System.out.println("  - Security Sandbox Protection: Ensures untrusted code cannot hijack core Java types.");
        System.out.println("==========================================================================");
    }
}
