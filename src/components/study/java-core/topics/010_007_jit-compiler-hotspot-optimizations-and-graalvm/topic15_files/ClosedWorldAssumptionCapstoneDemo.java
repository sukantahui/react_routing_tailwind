/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 15: The Closed-World Assumption - Reflection & Dynamic Loading Constraints (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class ClosedWorldAssumptionCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: THE CLOSED-WORLD ASSUMPTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS THE CLOSED-WORLD ASSUMPTION:");
        System.out.println("  1. Definition: All bytecode that will EVER execute at runtime must be known at BUILD TIME.");
        System.out.println("  2. Consequence: Dynamic class loading at runtime (e.g. downloading new JARs) is IMPOSSIBLE in Native Image!\n");

        System.out.println(">>> DYNAMIC JAVA FEATURES THAT REQUIRE CONFIGURATION IN NATIVE IMAGE:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  DYNAMIC FEATURE              LIMITATION                      SOLUTION / CONFIGURATION");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  Reflection (Class.forName)   Tree shaker strips unused code  'reflect-config.json' metadata");
        System.out.println("  Dynamic Proxies (Proxy.new)  Bytecode generation unavailable 'proxy-config.json' metadata");
        System.out.println("  Resource Loading (getResource) Files not in binary           'resource-config.json' metadata");
        System.out.println("  JNI Calls (C++ bindings)     Missing native method handles   'jni-config.json' metadata");
        System.out.println("  -----------------------------------------------------------------------------------------\n");

        System.out.println(">>> THE GRAALVM TRACING AGENT (AUTOMATIC METADATA GENERATION):");
        System.out.println("  - Run app on standard JVM with agent:");
        System.out.println("    'java -agentlib:native-image-agent=config-output-dir=META-INF/native-image -jar app.jar'");
        System.out.println("  - The agent automatically records all reflection calls and generates all JSON config files!");

        System.out.println("\n==========================================================================");
        System.out.println(" SEGMENT 10 COMPLETE: 7/7 MODULES (110 TOPICS) 100% MASTERED!");
        System.out.println("==========================================================================");
    }
}
