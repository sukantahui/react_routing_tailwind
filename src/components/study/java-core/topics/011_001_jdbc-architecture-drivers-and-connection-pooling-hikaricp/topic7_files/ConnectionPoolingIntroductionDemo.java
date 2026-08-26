/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 7: Introduction to Connection Pooling - Pre-Warmed Pool Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConnectionPoolingIntroductionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CONNECTION POOLING INTRODUCTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW A CONNECTION POOL OPERATES:");
        System.out.println("  1. INITIALIZATION : Pool opens a pre-warmed set of physical TCP connections (e.g. 10 connections) at startup.");
        System.out.println("  2. BORROW (Lease) : Application thread calls 'dataSource.getConnection()' -> Pool hands over an available connection in < 1ms!");
        System.out.println("  3. EXECUTION      : Thread executes SQL queries over the warm TCP socket.");
        System.out.println("  4. RETURN (Close) : Thread calls 'connection.close()' -> Pool PROXY intercepts the call and RETURNS the connection to the pool rather than severing the TCP socket!\n");

        System.out.println(">>> DRAMATIC METRICS COMPARISON:");
        System.out.println("  - Direct DriverManager Connection : ~150 ms latency per request.");
        System.out.println("  - Connection Pool (HikariCP)      : ~0.002 ms (2 microseconds!) lease latency!");
        System.out.println("  - 75,000x faster connection acquisition! ⚡");

        System.out.println("\n==========================================================================");
    }
}
