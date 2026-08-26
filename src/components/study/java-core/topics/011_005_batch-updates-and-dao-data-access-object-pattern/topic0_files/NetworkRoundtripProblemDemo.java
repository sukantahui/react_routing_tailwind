/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 0: The Network Round-Trip Problem - Loop Latency Bottleneck
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class NetworkRoundtripProblemDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE NETWORK ROUND-TRIP BOTTLENECK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE MATHEMATICS OF LOOP LATENCY:");
        System.out.println("  - Dataset Size       : 10,000 Student Records");
        System.out.println("  - Network RTT Latency: 5 milliseconds (Client -> DB Server -> Client)\n");

        System.out.println(">>> SCENARIO A: INDIVIDUAL INSERTS IN A FOR-LOOP:");
        System.out.println("  - 10,000 separate TCP request/response packets.");
        System.out.println("  - Total Time: 10,000 * 5ms = 50,000 ms = 50.0 SECONDS! (Unusable in production)\n");

        System.out.println(">>> SCENARIO B: JDBC BATCH PROCESSING (addBatch / executeBatch):");
        System.out.println("  - 10 batches of 1,000 rows each = 10 network roundtrips.");
        System.out.println("  - Total Time: 10 * 5ms + DB write time = ~0.65 SECONDS! (75x Speedup!) 🚀");

        System.out.println("\n==========================================================================");
    }
}
