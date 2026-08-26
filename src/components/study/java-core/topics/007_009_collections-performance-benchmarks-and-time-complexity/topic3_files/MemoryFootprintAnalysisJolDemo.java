/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 3: Memory Footprint Analysis: Object Headers, Compressed OOPs & JOL Internals
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class MemoryFootprintAnalysisJolDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: MEMORY FOOTPRINT & OBJECT HEADER ANALYSIS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 64-BIT JVM MEMORY OBJECT LAYOUT (WITH COMPRESSED OOPS):");
        System.out.println("  1. Standard Object Header : 12 bytes (8-byte Mark Word + 4-byte Klass Word).");
        System.out.println("  2. 8-Byte Alignment Pad   : All objects on 64-bit JVMs are rounded up to multiples of 8 bytes!");
        System.out.println();
        System.out.println(">>> MEMORY COST PER ENTRY ACROSS JCF IMPLEMENTATIONS (1,000,000 Elements):");
        System.out.println("+-------------------+-------------------+-------------------+---------------------------+");
        System.out.println("| Implementation    | Node Class Size   | Bytes Per Element | Total RAM for 1M Elements |");
        System.out.println("+-------------------+-------------------+-------------------+---------------------------+");
        System.out.println("| Primitive int[]   | N/A (Flat array)  | 4 bytes           | ~4 MB (Maximum Density)   |");
        System.out.println("| ArrayList<Integer>| Ref (4B) + Box(16B| 20 - 24 bytes     | ~24 MB (6x primitive!)    |");
        System.out.println("| LinkedList<Int>   | Node (24B) + (16B)| 40 - 48 bytes     | ~48 MB (12x primitive!)   |");
        System.out.println("| HashSet<Integer>  | Map.Node (32B)+16B| 48 - 56 bytes     | ~56 MB (14x primitive!)   |");
        System.out.println("| HashMap<Int, Int> | Node (32B)+16B+16B| ~64 bytes         | ~64 MB (16x primitive!)   |");
        System.out.println("+-------------------+-------------------+-------------------+---------------------------+");

        System.out.println("\n>>> WHY NODE-BASED COLLECTIONS CONSUME MASSIVE RAM:");
        System.out.println("  - In LinkedList: Each 'Node' has Object header (12B) + item ref (4B) + next ref (4B) + prev ref (4B) = 24 bytes just for the container!");
        System.out.println("  - Plus the boxed 'Integer' object: Object header (12B) + int value (4B) = 16 bytes!");
        System.out.println("  - Storing a single 4-byte integer in LinkedList consumes 40 to 48 bytes of RAM (1000% memory overhead!).");

        System.out.println("\n==========================================================================");
    }
}