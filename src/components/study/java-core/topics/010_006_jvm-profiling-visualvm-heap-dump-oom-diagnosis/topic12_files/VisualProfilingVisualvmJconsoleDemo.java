/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 12: Visual Profiling with VisualVM & JConsole
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class VisualProfilingVisualvmJconsoleDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: VISUAL PROFILING (VISUALVM & JCONSOLE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY VISUALVM TABS & CAPABILITIES:");
        System.out.println("  1. OVERVIEW TAB : JVM Arguments, System Properties, Java Version, Main Class.");
        System.out.println("  2. MONITOR TAB  : Live 4-quadrant charts (CPU %, Heap & Metaspace MB, Loaded Classes, Live Threads).");
        System.out.println("  3. THREADS TAB  : Real-time thread state timeline (Running, Sleeping, Waiting, Monitor Blocked).");
        System.out.println("  4. SAMPLER TAB  : Low-overhead CPU & Memory sampling (Top methods & Top instantiated classes).");
        System.out.println("  5. PROFILER TAB : Exact byte-level method execution timing and allocation profiling.\n");

        System.out.println(">>> CONNECTING TO REMOTE PRODUCTION SERVERS (JMX Flags):");
        System.out.println("  -Dcom.sun.management.jmxremote");
        System.out.println("  -Dcom.sun.management.jmxremote.port=9010");
        System.out.println("  -Dcom.sun.management.jmxremote.authenticate=false");
        System.out.println("  -Dcom.sun.management.jmxremote.ssl=false");

        System.out.println("\n==========================================================================");
    }
}
