/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 4: Rules of Abstract Methods: Can ONLY Exist Inside Abstract Classes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractMethodEnclosureRulesDemo {

    // RULE: If a class declares even ONE abstract method, the class MUST be marked 'abstract'!
    public abstract static class NetworkProtocol {
        // Abstract method
        public abstract void transmitPacket(byte[] payload);

        // Concrete helper
        public void logTransmission(int byteCount) {
            System.out.printf("  [NETWORK] Dispatched %d bytes over Barrackpore Gigabit LAN.\n", byteCount);
        }
    }

    // Concrete implementation
    public static class Http3Protocol extends NetworkProtocol {
        @Override
        public void transmitPacket(byte[] payload) {
            System.out.println("  [HTTP/3 QUIC] Encapsulated payload in UDP frame.");
            super.logTransmission(payload.length);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ABSTRACT METHOD ENCLOSURE RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NetworkProtocol protocol = new Http3Protocol();
        protocol.transmitPacket(new byte[]{10, 20, 30, 40, 50});

        System.out.println("\n>>> Compiler Law:");
        System.out.println("  - A regular (concrete) class CANNOT contain abstract methods.");
        System.out.println("  - Writing 'abstract void test();' inside 'class Regular {}' triggers:");
        System.out.println("    'Regular is not abstract and does not override abstract method test()'");

        System.out.println("\n==========================================================================");
    }
}