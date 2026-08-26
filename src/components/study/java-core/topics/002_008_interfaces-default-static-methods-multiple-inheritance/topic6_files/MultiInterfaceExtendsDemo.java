/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 6: Interface Extending Other Interfaces: Multi-Interface Inheritance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class MultiInterfaceExtendsDemo {

    public interface ReadableStream {
        void read();
    }

    public interface WritableStream {
        void write();
    }

    // MULTI-INTERFACE INHERITANCE: An interface CAN extend MULTIPLE interfaces!
    public interface BidirectionalDuplexStream extends ReadableStream, WritableStream {
        void flush();
    }

    public static class BarrackporeNetworkSocket implements BidirectionalDuplexStream {
        @Override
        public void read() {
            System.out.println("  [READ] Receiving TCP packets on Barrackpore socket...");
        }

        @Override
        public void write() {
            System.out.println("  [WRITE] Transmitting encrypted response bytes...");
        }

        @Override
        public void flush() {
            System.out.println("  [FLUSH] Socket buffers cleared.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: MULTI-INTERFACE EXTENSION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BidirectionalDuplexStream socket = new BarrackporeNetworkSocket();
        socket.read();
        socket.write();
        socket.flush();

        System.out.println("\n==========================================================================");
    }
}