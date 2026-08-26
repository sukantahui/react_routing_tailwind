/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 5: Rules of Multiple Bounds: Class Bound Order & Single Class Mandate
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.io.Serializable;

class BaseEntity {
    public void validate() { System.out.println("  [VALIDATING BASE ENTITY]"); }
}

interface Printable {
    void print();
}

interface Exportable {
    void export();
}

// 1. VALID MULTIPLE BOUND (Class 'BaseEntity' comes FIRST, followed by interfaces):
class ValidBoundProcessor<T extends BaseEntity & Printable & Exportable> {
    public void process(T item) {
        item.validate(); // from BaseEntity
        item.print();    // from Printable
        item.export();   // from Exportable
    }
}

// 2. INVALID SYNTAX EXAMPLES (Will NOT compile):
// Error 1: Interface before Class -> class Invalid1<T extends Printable & BaseEntity> { }
// Error 2: Multiple Classes       -> class Invalid2<T extends BaseEntity & String> { }

public class MultipleBoundsRulesOrderingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: MULTIPLE BOUNDS ORDERING RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 STRICT COMPILATION RULES FOR MULTIPLE BOUNDS:");
        System.out.println("  Rule 1: Class Bound Must Come First.");
        System.out.println("          '<T extends MyClass & MyInterface>' is valid.");
        System.out.println("          '<T extends MyInterface & MyClass>' produces a COMPILE ERROR: 'interface expected here'.");
        System.out.println();
        System.out.println("  Rule 2: At Most ONE Class Allowed.");
        System.out.println("          Since Java does not support multiple class inheritance, you cannot list two classes ('<T extends ClassA & ClassB>' fails).");
        System.out.println();
        System.out.println("  Rule 3: Unlimited Interfaces Allowed.");
        System.out.println("          You can append as many interface bounds as required ('& InterfaceA & InterfaceB & InterfaceC').");

        System.out.println("\n==========================================================================");
    }
}