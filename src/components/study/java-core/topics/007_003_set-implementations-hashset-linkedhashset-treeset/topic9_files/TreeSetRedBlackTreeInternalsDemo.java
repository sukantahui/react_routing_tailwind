/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 9: java.util.TreeSet Internal Mechanics: Backed by a Red-Black Binary Search Tree (TreeMap)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.NavigableMap;
import java.util.TreeSet;

public class TreeSetRedBlackTreeInternalsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: TreeSet RED-BLACK TREE (TreeMap) INTERNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TreeSet<Integer> rollTree = new TreeSet<>();
        rollTree.add(104);
        rollTree.add(101);
        rollTree.add(108);
        rollTree.add(102);

        // Inspecting private transient NavigableMap<E,Object> m field in TreeSet:
        Field mapField = TreeSet.class.getDeclaredField("m");
        mapField.setAccessible(true);
        NavigableMap<?, ?> internalTreeMap = (NavigableMap<?, ?>) mapField.get(rollTree);

        System.out.println(">>> 1. Reflecting Inside TreeSet's Internal State:");
        System.out.println("  TreeSet Class            : " + rollTree.getClass().getName());
        System.out.println("  Internal Backing Map     : " + internalTreeMap.getClass().getName());
        System.out.println("  Internal TreeMap Entries : " + internalTreeMap);

        System.out.println("\n>>> HOW TreeSet WORKS INTERNALLY:");
        System.out.println("  1. Backed by TreeMap: Just like HashSet uses HashMap, TreeSet is backed by 'java.util.TreeMap'!");
        System.out.println("  2. Red-Black Tree Data Structure: TreeMap is a self-balancing binary search tree.");
        System.out.println("  3. Guaranteed Height Balance   : The tree never degenerates into a linear linked list.");
        System.out.println("  4. Automatic Sorting           : In-order traversal naturally yields elements in sorted ascending order.");

        System.out.println("\n==========================================================================");
    }
}