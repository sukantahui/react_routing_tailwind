/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 8: JVM CLI Diagnostics - The JDK Troubleshooting Toolkit
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.lang.management.ManagementFactory;

public class JvmCliDiagnosticsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: JVM CLI DIAGNOSTICS OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        String jvmPid = ManagementFactory.getRuntimeMXBean().getName().split("@")[0];
        System.out.println(">>> 1. CURRENT JAVA PROCESS ID (PID): " + jvmPid + "\n");

        System.out.println(">>> 2. THE ESSENTIAL JDK CLI DIAGNOSTICS SUITE ($JAVA_HOME/bin):");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  TOOL       COMMAND EXAMPLE                 PURPOSE");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  jps        jps -lv                         Lists all running Java PIDs and launch arguments.");
        System.out.println("  jcmd       jcmd " + jvmPid + " Thread.print         Universal diagnostic Swiss-army knife (replaces jstack/jmap).");
        System.out.println("  jstat      jstat -gcutil " + jvmPid + " 1000 10    Watches real-time GC percentages every 1 second.");
        System.out.println("  jstack     jstack -l " + jvmPid + "                Captures thread dump to detect deadlocks & stuck threads.");
        System.out.println("  jmap       jmap -histo " + jvmPid + "              Quick live object histogram in terminal.");
        System.out.println("  -----------------------------------------------------------------------------------------");

        System.out.println("\n==========================================================================");
    }
}
