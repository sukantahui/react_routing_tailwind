/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 2: The Matching Algorithm - Partial & Full Fills
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class TheMatchingAlgorithmDemo {

    public record Trade(long matchId, long buyOrderId, long sellOrderId, BigDecimal price, long matchedQty, Instant time) {}

    public static class LimitOrder {
        long id;
        TradingEngineArchitectureDemo.Side side;
        BigDecimal price;
        long remainingQty;

        public LimitOrder(long id, TradingEngineArchitectureDemo.Side side, BigDecimal price, long qty) {
            this.id = id; this.side = side; this.price = price; this.remainingQty = qty;
        }
    }

    public static List<Trade> match(LimitOrder incoming, List<LimitOrder> restingOppositeOrders) {
        List<Trade> executedTrades = new ArrayList<>();
        long matchCounter = 1L;

        for (LimitOrder resting : restingOppositeOrders) {
            if (incoming.remainingQty <= 0) break;

            // Check if price crosses spread:
            boolean canMatch = incoming.side == TradingEngineArchitectureDemo.Side.BUY
                ? incoming.price.compareTo(resting.price) >= 0
                : incoming.price.compareTo(resting.price) <= 0;

            if (!canMatch) break;

            long fillQty = Math.min(incoming.remainingQty, resting.remainingQty);
            incoming.remainingQty -= fillQty;
            resting.remainingQty -= fillQty;

            executedTrades.add(new Trade(
                matchCounter++,
                incoming.side == TradingEngineArchitectureDemo.Side.BUY ? incoming.id : resting.id,
                incoming.side == TradingEngineArchitectureDemo.Side.SELL ? incoming.id : resting.id,
                resting.price, // Execution price is resting order price (Maker price)!
                fillQty,
                Instant.now()
            ));
        }
        return executedTrades;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE MATCHING ALGORITHM - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        LimitOrder restingAsk = new LimitOrder(101L, TradingEngineArchitectureDemo.Side.SELL, new BigDecimal("3500.00"), 60);
        LimitOrder incomingBid = new LimitOrder(201L, TradingEngineArchitectureDemo.Side.BUY, new BigDecimal("3500.00"), 100);

        List<Trade> trades = match(incomingBid, List.of(restingAsk));

        System.out.println("Executed Trade Results:");
        trades.forEach(t -> System.out.println("  ⚡ MATCH: " + t.matchedQty() + " shares @ ₹" + t.price()));
        System.out.println("Incoming Bid Remaining Qty: " + incomingBid.remainingQty + " shares (Resting on book)");

        System.out.println("\n==========================================================================");
    }
}
