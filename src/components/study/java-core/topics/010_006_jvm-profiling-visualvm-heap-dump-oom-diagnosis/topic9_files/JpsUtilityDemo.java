/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 9: The jps Utility - Java Process Status Tool
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class JpsUtilityDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: THE JPS UTILITY (JAVA PROCESS STATUS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> JPS COMMAND LINE VARIATIONS & OUTPUTS:");
        System.out.println("  1. 'jps'        : Displays PID and short class name (e.g. '7742 JpsUtilityDemo').");
        System.out.println("  2. 'jps -l'     : Displays PID and FULL package name (e.g. '7742 com.coderaccotax...JpsUtilityDemo').");
        System.out.println("  3. 'jps -v'     : Displays PID and all active JVM FLAGS (e.g. '-Xmx4g -XX:+UseG1GC').");
        System.out.println("  4. 'jps -m'     : Displays PID and arguments passed to the main() method.");
        System.out.println("  5. 'jps -lvm'   : [PRO TIP] Displays FULL package, flags, and arguments together!\n");

        System.out.println(">>> HOW JPS LOCATES JAVA PROCESSES:");
        System.out.println("  - Reads performance data files from: '/tmp/hsperfdata_<username>/<pid>' on Linux");
        System.out.println("  - Reads performance data files from: '%TEMP%/hsperfdata_<username>/<pid>' on Windows.");

        System.out.println("\n==========================================================================");
    }
}
