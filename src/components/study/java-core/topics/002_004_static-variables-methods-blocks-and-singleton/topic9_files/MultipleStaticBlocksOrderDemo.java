/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 9: Order of Execution with Multiple Static Blocks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class MultipleStaticBlocksOrderDemo {

    public static class SystemBootstrapper {
        public static String systemVersion;
        public static String encryptionKey;

        // Static Block 1
        static {
            systemVersion = "v2026.1-RELEASE";
            System.out.println("  [SIB 1] Loaded system version: " + systemVersion);
        }

        // Static Block 2
        static {
            encryptionKey = "AES-256-" + System.currentTimeMillis();
            System.out.println("  [SIB 2] Generated system encryption key: " + encryptionKey);
        }

        // Static Block 3
        static {
            System.out.println("  [SIB 3] Security checks passed. System ready!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: MULTIPLE STATIC BLOCKS EXECUTION ORDER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Triggering Class Loading of SystemBootstrapper:");
        String ver = SystemBootstrapper.systemVersion;
        System.out.println("\n>>> SystemBootstrapper successfully initialized with version: " + ver);

        System.out.println("\n==========================================================================");
    }
}