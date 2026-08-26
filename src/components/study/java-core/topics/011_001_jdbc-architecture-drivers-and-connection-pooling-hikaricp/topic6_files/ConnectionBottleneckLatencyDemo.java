/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 6: The Connection Bottleneck - TCP Handshakes & Auth Latency
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConnectionBottleneckLatencyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE CONNECTION BOTTLENECK - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 7 EXPENSIVE STEPS OF OPENING A PHYSICAL DB CONNECTION:");
        System.out.println("  1. DNS Resolution              : Resolving DB hostname to IP (1 - 5 ms)");
        System.out.println("  2. TCP 3-Way Handshake         : SYN, SYN-ACK, ACK network round-trips (5 - 20 ms)");
        System.out.println("  3. TLS / SSL Handshake         : Certificate exchange, cipher negotiation (10 - 40 ms)");
        System.out.println("  4. Authentication Protocol     : Password hashing, challenge-response token (10 - 30 ms)");
        System.out.println("  5. Server Process / Thread Fork: DB allocates memory buffers and backend worker process (20 - 50 ms)");
        System.out.println("  6. Session Initialization      : Loading session variables, character encoding (5 - 15 ms)");
        System.out.println("  7. TOTAL OPENING OVERHEAD      : 50 ms - 200 ms PER CONNECTION!\n");

        System.out.println(">>> THE DISASTER SCENARIO (Manual DriverManager in Web Server):");
        System.out.println("  - 1,000 HTTP Requests / sec x 100ms connection latency = 100 SECONDS of wasted wait time!");
        System.out.println("  - Database server process crashes due to 'max_connections' exhaustion!");
        System.out.println("==========================================================================");
    }
}
