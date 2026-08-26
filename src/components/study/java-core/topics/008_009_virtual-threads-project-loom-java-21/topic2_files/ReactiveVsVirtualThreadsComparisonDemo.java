/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 2: Reactive Programming (WebFlux/RxJava) vs Virtual Threads: Complexity vs Simplicity
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class ReactiveVsVirtualThreadsComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: REACTIVE PROGRAMMING vs VIRTUAL THREADS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Architectural Axis| Reactive Frameworks (WebFlux)     | Virtual Threads (Java 21+ Loom)   |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Programming Model | Asynchronous Non-Blocking Mono/Flux| Straightforward Synchronous Code  |");
        System.out.println("| Code Readability  | Complex nested lambda pipelines   | Simple, clean, sequential code    |");
        System.out.println("| Debugging & Stacks| Broken, fragmented stack traces   | Clean, standard JVM stack traces  |");
        System.out.println("| ThreadLocal & IDE | Incompatible / Context Propagation| 100% Compatible with ThreadLocal  |");
        System.out.println("| Learning Curve    | Extremely steep (Mono, Flux, Zip) | ZERO learning curve (Plain Java!) |");
        System.out.println("| Throughput        | Very High                         | Equally High (Millions of threads)|");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> THE VERDICT (Ron Pressler, Project Loom Lead):");
        System.out.println("  - 'Virtual Threads bring reactive throughput without abandoning the simple synchronous Java programming model!'");

        System.out.println("\n==========================================================================");
    }
}