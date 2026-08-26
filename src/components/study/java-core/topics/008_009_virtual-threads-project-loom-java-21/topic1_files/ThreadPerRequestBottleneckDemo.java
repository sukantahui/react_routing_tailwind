/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 1: The Thread-per-Request Scaling Bottleneck in Web Servers (Tomcat, Spring MVC)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class ThreadPerRequestBottleneckDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THREAD-PER-REQUEST BOTTLENECK IN TOMCAT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE TRADITIONAL SERVLET THREAD-PER-REQUEST MODEL (Spring MVC / Tomcat):");
        System.out.println("  1. Tomcat allocates a fixed pool of 200 OS worker threads ('maxThreads=200').");
        System.out.println("  2. Request 1 arrives -> Worker Thread #1 accepts and executes SQL query (Blocks 200 ms for database).");
        System.out.println("  3. While blocking on SQL I/O, Worker Thread #1 IS FROZEN DOING ZERO CPU WORK, but still monopolizes 1 MB of RAM!");
        System.out.println();
        System.out.println(">>> THE TRAFFIC SPIKE CLIFF:");
        System.out.println("  - If 500 concurrent users request tax reports simultaneously:");
        System.out.println("    * 200 users occupy all 200 worker threads (all 200 threads blocked waiting for DB I/O).");
        System.out.println("    * Remaining 300 requests are placed in Tomcat's accept-queue ('acceptCount=100').");
        System.out.println("    * Queue overflows -> Incoming users receive HTTP 503 Service Unavailable or Connection Timeout!");
        System.out.println();
        System.out.println(">>> THE IRONY: CPU USAGE IS ONLY 5%! The server crashed from THREAD STARVATION, not CPU saturation!");

        System.out.println("\n==========================================================================");
    }
}