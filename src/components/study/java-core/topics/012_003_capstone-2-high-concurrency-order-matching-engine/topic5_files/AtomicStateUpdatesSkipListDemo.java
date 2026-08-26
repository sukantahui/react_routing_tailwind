/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 5: Atomic State Updates - ConcurrentSkipListMap & Atomics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicLong;

public class AtomicStateUpdatesSkipListDemo {

    public record SimpleOrder(long id, long priceMicros, long qty) {}

    public static class ConcurrentOrderBook {
        private final ConcurrentSkipListMap<Long, ConcurrentLinkedQueue<SimpleOrder>> bidBook =
            new ConcurrentSkipListMap<>((a, b) -> Long.compare(b, a)); // Descending

        private final AtomicLong tradeSequence = new AtomicLong(1L);

        public void submitBid(long priceMicros, SimpleOrder order) {
            bidBook.computeIfAbsent(priceMicros, p -> new ConcurrentLinkedQueue<>()).add(order);
        }

        public long nextTradeId() {
            return tradeSequence.getAndIncrement();
        }

        public Long getBestBidPrice() {
            return bidBook.isEmpty() ? null : bidBook.firstKey();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: CONCURRENT SKIP LIST MAP & ATOMICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentOrderBook book = new ConcurrentOrderBook();
        book.submitBid(3500000000L, new SimpleOrder(1L, 3500000000L, 50));
        book.submitBid(3525000000L, new SimpleOrder(2L, 3525000000L, 100));

        System.out.println("Current Best Bid Price (Lock-Free): " + book.getBestBidPrice() / 1_000_000.0);
        System.out.println("Allocated Trade Sequence ID       : " + book.nextTradeId());

        System.out.println("\n==========================================================================");
    }
}
