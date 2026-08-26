/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 7: I - Interface Segregation Principle (ISP): 'No Client Forced to Depend on Unused Methods'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class InterfaceSegregationPrincipleDemo {

    // ANTI-PATTERN: 'Fat / Bloated Interface'
    // public interface BloatedMultiFunctionDevice {
    //     void print(String doc);
    //     void scan(String doc);
    //     void fax(String doc); // A simple laser printer cannot fax!
    // }

    // ISP COMPLIANT: Fine-grained, role-specific interfaces!
    public interface Printer {
        void printDocument(String content);
    }

    public interface Scanner {
        void scanDocument(String content);
    }

    public interface FaxMachine {
        void sendFax(String content);
    }

    // 1. Simple Budget Printer implements ONLY what it actually supports:
    public static class SimpleLaserPrinter implements Printer {
        public void printDocument(String content) {
            System.out.println("  [LASER PRINTER] Printed: " + content);
        }
    }

    // 2. High-End Office All-In-One implements multiple interfaces:
    public static class EnterpriseWorkstation implements Printer, Scanner, FaxMachine {
        public void printDocument(String c) { System.out.println("  [ENTERPRISE] Printing: " + c); }
        public void scanDocument(String c)  { System.out.println("  [ENTERPRISE] Scanning: " + c); }
        public void sendFax(String c)       { System.out.println("  [ENTERPRISE] Faxing: " + c); }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: INTERFACE SEGREGATION PRINCIPLE (ISP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Printer budget = new SimpleLaserPrinter();
        budget.printDocument("Swadeep Paul's Java Certificate");

        EnterpriseWorkstation office = new EnterpriseWorkstation();
        office.scanDocument("Admissions Form");
        office.printDocument("Receipt BKP-2026");

        System.out.println("\n>>> ISP Rule: Clients should never be forced to implement methods they do not need.");

        System.out.println("\n==========================================================================");
    }
}