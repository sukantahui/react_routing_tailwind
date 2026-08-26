/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 0: Why Inter-Thread Communication is Needed: The High Cost of Busy-Wait Polling
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class BusyWaitingVsInterThreadCommDemo {

    private static volatile boolean dataReady = false;
    private static String invoicePayload = null;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: AVOIDING BUSY-WAIT POLLING WITH INTER-THREAD COMM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. THE BAD APPROACH: BUSY-WAIT POLLING (Spins CPU at 100% load):
        Thread consumerBusyWait = new Thread(() -> {
            long spinIterations = 0;
            System.out.println("  [Consumer] Starting busy-wait polling loop...");

            // BUSY WAITING LOOP: Burns millions of CPU cycles checking a boolean flag:
            while (!dataReady) {
                spinIterations++; // Wasteful CPU burn!
            }

            System.out.printf("  [Consumer] Data arrived! Burned %,d CPU spin cycles waiting!%n", spinIterations);
            System.out.println("  [Consumer] Processed: " + invoicePayload);
        }, "Busy-Wait-Consumer");

        // 2. Producer thread generating data after 200 ms:
        Thread producer = new Thread(() -> {
            try { Thread.sleep(200); } catch (InterruptedException ignored) {}
            invoicePayload = "GST-INV-2026-BARRACKPORE-001";
            dataReady = true; // Signal data ready
            System.out.println(">>> [Producer] Data generated and ready flag set to TRUE!");
        }, "Producer-Thread");

        consumerBusyWait.start();
        producer.start();

        consumerBusyWait.join();
        producer.join();

        System.out.println("\n>>> WHY BUSY-WAITING POLLING IS CATASTROPHIC IN PRODUCTION:");
        System.out.println("  1. 100% CPU Core Saturation: A spinning thread starves other threads and burns excessive battery/server power.");
        System.out.println("  2. Solution (Signaling)   : Threads should SLEEP peacefully and be WOKEN UP only when data is ready via 'wait()' and 'notify()'!");

        System.out.println("\n==========================================================================");
    }
}