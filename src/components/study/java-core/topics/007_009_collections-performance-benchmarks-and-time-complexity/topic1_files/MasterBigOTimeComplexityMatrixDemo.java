/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 1: Master Big-O Time Complexity Matrix across All Collection Operations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class MasterBigOTimeComplexityMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: MASTER BIG-O TIME COMPLEXITY MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE GRAND BIG-O PERFORMANCE MATRIX (AVERAGE CASE):");
        System.out.println("+-------------------+---------------+---------------+---------------+---------------+---------------+");
        System.out.println("| Collection        | Random Access | Insert (Head) | Insert (Tail) | Insert (Mid)  | Search/Lookup |");
        System.out.println("+-------------------+---------------+---------------+---------------+---------------+---------------+");
        System.out.println("| ArrayList         | O(1) [Fast]   | O(n) [Shift]  | O(1) Amortized| O(n) [Shift]  | O(n) Contains |");
        System.out.println("| LinkedList        | O(n) [Seek]   | O(1) [Fast]   | O(1) [Fast]   | O(n) [Seek]   | O(n) Contains |");
        System.out.println("| ArrayDeque        | O(1) Ends     | O(1) [Fast]   | O(1) [Fast]   | N/A (Deque)   | O(n) Contains |");
        System.out.println("| PriorityQueue     | O(1) Peek Min | O(log n) Sift | O(log n) Sift | N/A (Heap)    | O(n) Contains |");
        System.out.println("| HashSet           | N/A (No Index)| O(1) Hash     | O(1) Hash     | O(1) Hash     | O(1) [Hash]   |");
        System.out.println("| LinkedHashSet     | N/A (No Index)| O(1) Hash     | O(1) Hash     | O(1) Hash     | O(1) [Hash]   |");
        System.out.println("| TreeSet           | N/A (No Index)| O(log n) Tree | O(log n) Tree | O(log n) Tree | O(log n) Tree |");
        System.out.println("| HashMap           | N/A (By Key)  | O(1) [put]    | O(1) [put]    | O(1) [put]    | O(1) [get]    |");
        System.out.println("| TreeMap           | N/A (By Key)  | O(log n) Tree | O(log n) Tree | O(log n) Tree | O(log n) Tree |");
        System.out.println("| ConcurrentHashMap | N/A (By Key)  | O(1) CAS/Lock | O(1) CAS/Lock | O(1) CAS/Lock | O(1) LockFree |");
        System.out.println("+-------------------+---------------+---------------+---------------+---------------+---------------+");

        System.out.println("\n==========================================================================");
    }
}