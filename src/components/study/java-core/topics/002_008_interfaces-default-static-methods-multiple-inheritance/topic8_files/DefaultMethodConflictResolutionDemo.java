/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 8: Resolving Multiple Inheritance Ambiguity with Default Methods (Diamond Conflict)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class DefaultMethodConflictResolutionDemo {

    public interface InterfaceAlpha {
        default void logStatus() {
            System.out.println("  [ALPHA DEFAULT] Status logged via Strategy Alpha.");
        }
    }

    public interface InterfaceBeta {
        default void logStatus() {
            System.out.println("  [BETA DEFAULT] Status logged via Strategy Beta.");
        }
    }

    // Class implementing both interfaces where both have identical default methods:
    // If the class does NOT override 'logStatus()', javac throws a COMPILE ERROR:
    // "class CompositeLogger inherits unrelated defaults for logStatus() from types InterfaceAlpha and InterfaceBeta"
    public static class CompositeLogger implements InterfaceAlpha, InterfaceBeta {

        // RESOLUTION SYNTAX: Child MUST override the method and can explicitly select
        // which interface default to call using 'InterfaceName.super.method()':
        @Override
        public void logStatus() {
            System.out.println("  [RESOLVED BY CHILD] Combining both interface logging mechanisms:");
            InterfaceAlpha.super.logStatus(); // Explicitly delegates to Alpha
            InterfaceBeta.super.logStatus();  // Explicitly delegates to Beta
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: DEFAULT METHOD DIAMOND CONFLICT RESOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CompositeLogger logger = new CompositeLogger();
        logger.logStatus();

        System.out.println("\n>>> Rules of Default Method Conflict Resolution:");
        System.out.println("  1. Classes win over interfaces (A class method overrides any interface default).");
        System.out.println("  2. Sub-interfaces win over parent interfaces (Most specific default wins).");
        System.out.println("  3. If 2 sibling interfaces conflict -> Implementing class MUST explicitly override!");

        System.out.println("\n==========================================================================");
    }
}