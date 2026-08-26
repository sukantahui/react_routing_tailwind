/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 1: Introduction to Java Collections Framework (JCF) Architecture in java.util
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class JcfArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JAVA COLLECTIONS FRAMEWORK ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 CORE COMPONENTS OF JAVA COLLECTIONS FRAMEWORK:");
        System.out.println("  1. Interfaces   : Abstract data types defining contracts (Collection, List, Set, Queue, Map).");
        System.out.println("  2. Implementations: Concrete data structure engines (ArrayList, HashSet, PriorityQueue, HashMap).");
        System.out.println("  3. Algorithms   : High-performance polymorphic utilities (Collections.sort(), binarySearch(), shuffle()).");

        System.out.println("\n>>> JCF HIERARCHY TREE IN java.util:");
        System.out.println("  java.lang.Iterable<T>");
        System.out.println("    └── java.util.Collection<E>");
        System.out.println("          ├── java.util.List<E>   (ArrayList, LinkedList, Vector)");
        System.out.println("          ├── java.util.Set<E>    (HashSet, LinkedHashSet, TreeSet)");
        System.out.println("          └── java.util.Queue<E>  (PriorityQueue, ArrayDeque, BlockingQueue)");
        System.out.println();
        System.out.println("  java.util.Map<K, V> (SEPARATE HIERARCHY!)");
        System.out.println("    ├── HashMap, LinkedHashMap, TreeMap");
        System.out.println("    └── ConcurrentHashMap");

        System.out.println("\n==========================================================================");
    }
}