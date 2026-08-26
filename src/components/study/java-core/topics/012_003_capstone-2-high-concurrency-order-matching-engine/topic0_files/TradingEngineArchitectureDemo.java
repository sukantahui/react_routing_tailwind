/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 0: Trading Engine Architecture - Bids, Asks & Limit Orders
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

public class TradingEngineArchitectureDemo {

    public enum Side { BUY, SELL }
    public enum OrderType { LIMIT, MARKET }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" CAPSTONE 2: HIGH-CONCURRENCY ORDER MATCHING ENGINE");
        System.out.println(" EDUCATOR: SUKANTA HUI | ACADEMIC HUB: BARRACKPORE, WB");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. CORE MARKET TERMINOLOGY:");
        System.out.println("  - BID (BUY)   : Buyers want to buy at highest possible price (Sorted DESCENDING).");
        System.out.println("  - ASK (SELL)  : Sellers want to sell at lowest possible price (Sorted ASCENDING).");
        System.out.println("  - SPREAD      : Lowest Ask Price - Highest Bid Price (Bid-Ask Spread).");
        System.out.println("  - CROSS SPREAD: When Best Bid >= Best Ask -> Match & Execute Trade! ⚡\n");

        System.out.println(">>> 2. MATCHING RULE: PRICE-TIME PRIORITY (FIFO):");
        System.out.println("  1. Better Price executes first (Higher Buy or Lower Sell).");
        System.out.println("  2. At identical price, older order (earlier timestamp) executes first!");

        System.out.println("\n==========================================================================");
    }
}
