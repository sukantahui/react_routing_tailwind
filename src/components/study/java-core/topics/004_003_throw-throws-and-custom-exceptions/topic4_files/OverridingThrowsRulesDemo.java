/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 4: Method Overriding Rules with 'throws': The Liskov Substitution Principle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.FileNotFoundException;
import java.io.IOException;

// Parent class defining initial throws contract:
class BaseAcademyService {
    public void generateReport() throws IOException {
        System.out.println("  [BASE] Generating basic report...");
    }
}

// 1. LEGAL OVERRIDE: Child throws a MORE SPECIFIC (Narrower) Checked Exception:
class BarrackporeBranchService extends BaseAcademyService {
    @Override
    public void generateReport() throws FileNotFoundException {
        System.out.println("  [LEGAL CHILD 1] Throws narrower FileNotFoundException.");
    }
}

// 2. LEGAL OVERRIDE: Child throws NO Checked Exception at all:
class NaihatiBranchService extends BaseAcademyService {
    @Override
    public void generateReport() {
        System.out.println("  [LEGAL CHILD 2] Throws no checked exceptions at all.");
    }
}

// 3. LEGAL OVERRIDE: Child can throw ANY Unchecked (RuntimeException) freely:
class ShyamnagarBranchService extends BaseAcademyService {
    @Override
    public void generateReport() throws NullPointerException, IllegalArgumentException {
        System.out.println("  [LEGAL CHILD 3] Throws unchecked RuntimeExceptions.");
    }
}

/*
 * ILLEGAL OVERRIDE (Causes Compile Error):
 *
 * class BadChildService extends BaseAcademyService {
 *     @Override
 *     public void generateReport() throws Exception { // COMPILE ERROR!
 *         // Error: generateReport() in BadChildService cannot override generateReport() in BaseAcademyService
 *         // overridden method does not throw java.lang.Exception
 *     }
 * }
 */

public class OverridingThrowsRulesDemo {
    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: METHOD OVERRIDING WITH 'throws' RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseAcademyService service = new BarrackporeBranchService();
        service.generateReport();

        System.out.println("\n>>> 3 GOLDEN OVERRIDING RULES WITH 'throws':");
        System.out.println("  1. Child method CANNOT throw a BROADER (Superclass) checked exception than parent.");
        System.out.println("  2. Child method CAN throw a NARROWER (Subclass) checked exception or FEWER exceptions.");
        System.out.println("  3. Child method can throw ANY Unchecked Exception (RuntimeException) without restrictions.");

        System.out.println("\n==========================================================================");
    }
}