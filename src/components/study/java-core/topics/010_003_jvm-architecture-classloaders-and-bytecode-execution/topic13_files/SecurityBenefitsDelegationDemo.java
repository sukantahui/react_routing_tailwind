/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 13: Security Benefits of Delegation - Preventing Rogue Class Hijacking
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class SecurityBenefitsDelegationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: SECURITY BENEFITS OF DELEGATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> ATTEMPTING TO HIJACK java.lang.String WITH CUSTOM BYTECODE:");
        System.out.println("  Scenario: A rogue library includes a fake 'java.lang.String' class on classpath.");
        System.out.println("  Execution flow:");
        System.out.println("  1. AppClassLoader receives request for 'java.lang.String'.");
        System.out.println("  2. AppClassLoader delegates up to Platform, which delegates to Bootstrap.");
        System.out.println("  3. Bootstrap ClassLoader finds GENUINE JDK 'java.lang.String' in java.base.");
        System.out.println("  4. Fake 'java.lang.String' on classpath is IGNORED completely!\n");

        System.out.println(">>> WHAT IF A CUSTOM CLASSLOADER BYPASSES DELEGATION (Prohibited Packages)?");
        System.out.println("  - If custom classloader tries to call defineClass('java.lang.MyHackedClass', bytes):");
        System.out.println("  - JVM throws 'java.lang.SecurityException: Prohibited package name: java.lang'!");
        System.out.println("  - The 'java.*' namespace is strictly reserved and locked down by the JVM.");

        System.out.println("\n==========================================================================");
    }
}
