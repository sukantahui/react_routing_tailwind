/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 5: The 4 Primary Branches of JCF: List, Set, Queue & Map Taxonomy Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class FourPrimaryJcfBranchesTaxonomyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE 4 PRIMARY BRANCHES OF JCF - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 PILLARS OF JAVA DATA STRUCTURES:");
        System.out.println("  1. LIST   : Ordered Sequence | Zero-Indexed | Permits Duplicates.");
        System.out.println("              Implementations: ArrayList (fast read), LinkedList (fast node insert), Vector (legacy synchronized).");
        System.out.println();
        System.out.println("  2. SET    : Unique Elements | Forbids Duplicates | Mathematical Set.");
        System.out.println("              Implementations: HashSet (O(1) unordered), LinkedHashSet (insertion ordered), TreeSet (red-black sorted).");
        System.out.println();
        System.out.println("  3. QUEUE  : FIFO / LIFO Buffers | Task Scheduling & Dispatching.");
        System.out.println("              Implementations: PriorityQueue (natural/custom heap order), ArrayDeque (blazing double-ended queue).");
        System.out.println();
        System.out.println("  4. MAP    : Key-Value Dictionary | Unique Keys | Fast Lookups.");
        System.out.println("              Implementations: HashMap (O(1) hash bucket), LinkedHashMap (ordered entries), TreeMap (sorted keys).");

        System.out.println("\n==========================================================================");
    }
}