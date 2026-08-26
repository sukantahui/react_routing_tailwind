/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 2: The 'extends' Keyword: Syntax and Rules
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class ExtendsKeywordSyntaxRulesDemo {

    // Valid Base Class
    public static class HardwareDevice {
        protected String deviceSerial;

        public HardwareDevice(String serial) {
            this.deviceSerial = serial;
        }
    }

    // Subclass using 'extends'
    public static class LabWorkstation extends HardwareDevice {
        private int ramGigabytes;

        public LabWorkstation(String serial, int ram) {
            super(serial); // Required parent constructor invocation
            this.ramGigabytes = ram;
        }

        public void printConfig() {
            System.out.printf("  [WORKSTATION] Serial: %s | RAM: %d GB\n", deviceSerial, ramGigabytes);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE 'extends' KEYWORD RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LabWorkstation station = new LabWorkstation("BKP-TERMINAL-01", 32);
        station.printConfig();

        System.out.println("\n>>> Core 'extends' Rules in Java:");
        System.out.println("  1. A class can extend ONLY ONE superclass (Single class inheritance).");
        System.out.println("  2. 'extends' creates a direct IS-A relationship.");
        System.out.println("  3. A final class cannot be extended (e.g. 'class MyString extends String' -> ERROR).");

        System.out.println("\n==========================================================================");
    }
}