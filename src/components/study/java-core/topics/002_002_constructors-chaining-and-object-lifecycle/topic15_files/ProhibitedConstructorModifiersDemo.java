/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 15: Can Constructors Be static, final, synchronized, or abstract?
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class ProhibitedConstructorModifiersDemo {

    public static class ModifierRulesCaseStudy {
        private String traineeName;

        // Valid Constructor: Access Modifiers ONLY
        public ModifierRulesCaseStudy(String traineeName) {
            this.traineeName = traineeName;
        }

        // ====================================================================
        // WHY PROHIBITED MODIFIERS CAUSE COMPILE-TIME ERRORS:
        // ====================================================================
        // 1. static: ILLEGAL!
        //    Constructors require an instance ('this') to populate fields.
        //    static members execute without any instance context.
        //    // public static ModifierRulesCaseStudy() {} -> COMPILE ERROR

        // 2. final: ILLEGAL!
        //    final prevents method overriding in subclasses.
        //    Constructors are NEVER inherited or overridden in the first place!
        //    // public final ModifierRulesCaseStudy() {} -> COMPILE ERROR

        // 3. abstract: ILLEGAL!
        //    abstract methods have no body and require subclass overrides.
        //    Constructors MUST initialize the instance's state.
        //    // public abstract ModifierRulesCaseStudy(); -> COMPILE ERROR

        // 4. synchronized: ILLEGAL!
        //    Locking 'this' during construction is forbidden because the object
        //    is still being created on the private thread stack (no other thread can see it).
        //    // public synchronized ModifierRulesCaseStudy() {} -> COMPILE ERROR
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: PROHIBITED CONSTRUCTOR MODIFIERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The 4 Forbidden Constructor Modifiers in Java:");
        System.out.println("  [X] static       -> modifier static not allowed here (needs 'this')");
        System.out.println("  [X] final        -> modifier final not allowed here (never overridden)");
        System.out.println("  [X] abstract     -> modifier abstract not allowed here (must initialize)");
        System.out.println("  [X] synchronized -> modifier synchronized not allowed here (thread-confined at birth)");

        System.out.println("\n>>> 2. Valid Modifiers Permitted on Constructors:");
        System.out.println("  [✔] public, protected, package-private, private");

        System.out.println("\n==========================================================================");
    }
}