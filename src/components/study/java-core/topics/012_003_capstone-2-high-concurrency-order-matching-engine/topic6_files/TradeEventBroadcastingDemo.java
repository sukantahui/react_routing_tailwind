/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 6: Trade Event Broadcasting - Observer & BlockingQueue
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class TradeEventBroadcastingDemo {

    public record ExecutionEvent(long tradeId, String symbol, double price, long qty) {}

    public static class TradeBroadcaster {
        private final BlockingQueue<ExecutionEvent> eventQueue = new ArrayBlockingQueue<>(10_000);

        public TradeBroadcaster() {
            // Background daemon thread consuming trade events:
            Thread consumer = new Thread(() -> {
                while (!Thread.currentThread().isInterrupted()) {
                    try {
                        ExecutionEvent event = eventQueue.take(); // Blocking wait
                        System.out.println("   [BROADCAST]: Market Data Ticker -> " + event.symbol() + " matched " + event.qty() + " @ ₹" + event.price());
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }, "MarketData-Dispatcher");
            consumer.setDaemon(true);
            consumer.start();
        }

        public void publish(ExecutionEvent event) {
            eventQueue.offer(event); // Non-blocking produce
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: TRADE EVENT BROADCASTING PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TradeBroadcaster broadcaster = new TradeBroadcaster();

        broadcaster.publish(new ExecutionEvent(1001L, "TCS", 3520.00, 50));
        broadcaster.publish(new ExecutionEvent(1002L, "INFY", 1850.50, 100));

        Thread.sleep(50); // Allow async consumer to flush output

        System.out.println("\n==========================================================================");
    }
}
