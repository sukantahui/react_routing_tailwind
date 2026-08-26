/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 1: Order Book Data Structures - NavigableMap & Queues
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

public class OrderBookDataStructuresDemo {

    public record Order(
        long orderId,
        String symbol,
        TradingEngineArchitectureDemo.Side side,
        BigDecimal price,
        long quantity,
        Instant timestamp
    ) {}

    public static class OrderBook {
        // Buy Book: Highest Price First (Descending):
        private final NavigableMap<BigDecimal, ArrayDeque<Order>> bids = new TreeMap<>(Collections.reverseOrder());

        // Sell Book: Lowest Price First (Ascending):
        private final NavigableMap<BigDecimal, ArrayDeque<Order>> asks = new TreeMap<>();

        public void addOrder(Order order) {
            NavigableMap<BigDecimal, ArrayDeque<Order>> book =
                order.side() == TradingEngineArchitectureDemo.Side.BUY ? bids : asks;

            book.computeIfAbsent(order.price(), p -> new ArrayDeque<>()).addLast(order);
        }

        public Optional<BigDecimal> getBestBidPrice() {
            return bids.isEmpty() ? Optional.empty() : Optional.of(bids.firstKey());
        }

        public Optional<BigDecimal> getBestAskPrice() {
            return asks.isEmpty() ? Optional.empty() : Optional.of(asks.firstKey());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: ORDER BOOK DATA STRUCTURES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        OrderBook book = new OrderBook();
        book.addOrder(new Order(1L, "TCS", TradingEngineArchitectureDemo.Side.BUY, new BigDecimal("3500.00"), 100, Instant.now()));
        book.addOrder(new Order(2L, "TCS", TradingEngineArchitectureDemo.Side.BUY, new BigDecimal("3520.00"), 50, Instant.now()));
        book.addOrder(new Order(3L, "TCS", TradingEngineArchitectureDemo.Side.SELL, new BigDecimal("3530.00"), 75, Instant.now()));

        System.out.println("Best Bid (Highest Buyer) : ₹" + book.getBestBidPrice().orElse(BigDecimal.ZERO));
        System.out.println("Best Ask (Lowest Seller) : ₹" + book.getBestAskPrice().orElse(BigDecimal.ZERO));

        System.out.println("\n==========================================================================");
    }
}
