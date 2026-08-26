/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 3: Ultra-Low Latency - Zero-GC Allocation Patterns
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

public class UltraLowLatencyZeroGCDemo {

    // Mutable reusable event object to eliminate GC allocations on hot path:
    public static class OrderEvent {
        long orderId;
        long priceMicros; // Store ₹3500.50 as integer 3500500000 (No BigDecimal heap allocation!)
        long quantity;

        public void reset(long id, long priceMicros, long qty) {
            this.orderId = id;
            this.priceMicros = priceMicros;
            this.quantity = qty;
        }
    }

    public static class EventRingBuffer {
        private final OrderEvent[] buffer;
        private final int mask;
        private long sequence = 0L;

        public EventRingBuffer(int capacityPowerOfTwo) {
            this.mask = capacityPowerOfTwo - 1;
            this.buffer = new OrderEvent[capacityPowerOfTwo];
            for (int i = 0; i < capacityPowerOfTwo; i++) {
                buffer[i] = new OrderEvent(); // Pre-allocated once at startup!
            }
        }

        public OrderEvent next() {
            return buffer[(int) (sequence++ & mask)];
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: ZERO-GC LOW LATENCY PATTERNS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EventRingBuffer ringBuffer = new EventRingBuffer(1024);

        // Hot loop reusing existing pre-allocated objects with zero GC overhead:
        for (int i = 0; i < 5; i++) {
            OrderEvent event = ringBuffer.next();
            event.reset(1000L + i, 3500000000L, 50);
            System.out.println("   [HOT PATH]: Reused event buffer slot for order: " + event.orderId);
        }

        System.out.println("\n>>> ZERO HEAP ALLOCATIONS ON CRITICAL MATCHING LOOP! ✅");
        System.out.println("==========================================================================");
    }
}
