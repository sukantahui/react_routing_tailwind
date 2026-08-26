/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 9: Young Generation - Eden & Survivor Spaces (8:1:1 Ratio)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

import java.util.ArrayList;
import java.util.List;

public class YoungGenEdenSurvivorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: YOUNG GENERATION (EDEN & SURVIVORS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. YOUNG GENERATION MEMORY BREAKDOWN (Default 8:1:1 Ratio):");
        System.out.println("  - EDEN SPACE (80%)        : Where all new objects (via 'new') are initially allocated.");
        System.out.println("  - SURVIVOR 0 (From - 10%) : Holds objects that survived 1+ Minor GCs.");
        System.out.println("  - SURVIVOR 1 (To - 10%)   : Target destination for survivors in the next Minor GC.\n");

        System.out.println(">>> 2. HOW MINOR GC COPYING WORKS:");
        System.out.println("  Step 1: Eden fills up -> Triggers Minor GC (Stop-The-World pause, ~1-5ms).");
        System.out.println("  Step 2: Live objects in Eden and Survivor-From are copied to Survivor-To.");
        System.out.println("  Step 3: Object ages are incremented by 1 (Tenuring Age counter).");
        System.out.println("  Step 4: Eden and Survivor-From are wiped 100% clean.");
        System.out.println("  Step 5: Survivor spaces swap roles (From becomes To, To becomes From)!\n");

        // Simulating rapid short-lived allocations in Eden:
        List<byte[]> shortLivedObjects = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            shortLivedObjects.add(new byte[1024 * 64]); // 64 KB chunks in Eden
        }
        System.out.println("3. Allocated 50 short-lived objects in Eden space successfully.");

        System.out.println("\n==========================================================================");
    }
}
