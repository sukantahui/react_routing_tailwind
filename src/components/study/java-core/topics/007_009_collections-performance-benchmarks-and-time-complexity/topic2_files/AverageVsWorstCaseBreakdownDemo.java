/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 2: Average Case vs Worst Case Breakdown: Hash Collisions & Tree Degeneration
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class AverageVsWorstCaseBreakdownDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: AVERAGE vs WORST CASE BREAKDOWN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> AVERAGE vs WORST CASE COMPARISON TABLE:");
        System.out.println("+-------------------+-------------------+-------------------+------------------------------------+");
        System.out.println("| Operation         | Average Case      | Worst Case        | What Causes the Worst Case?        |");
        System.out.println("+-------------------+-------------------+-------------------+------------------------------------+");
        System.out.println("| ArrayList.add()   | O(1) Amortized    | O(n)              | Array capacity exhaustion (resize) |");
        System.out.println("| HashMap.get()     | O(1) Constant     | O(log n) (Java 8+)| Hash collision storm (TreeBin)     |");
        System.out.println("| HashMap.get()     | O(1) Constant     | O(n) (Java 7)     | Hash collision storm (Linked list) |");
        System.out.println("| HashSet.contains()| O(1) Constant     | O(log n) (Java 8+)| Broken or constant hashCode()      |");
        System.out.println("| TreeSet.add()     | O(log n)          | O(log n)          | NONE! Red-Black Tree self-balances!|");
        System.out.println("| Quicksort (Dual)  | O(n log n)        | O(n^2)            | Highly pathological pivot inputs   |");
        System.out.println("| TimSort           | O(n log n)        | O(n log n)        | NONE! Merge Sort is O(n log n) max!|");
        System.out.println("+-------------------+-------------------+-------------------+------------------------------------+");

        System.out.println("\n>>> WHY JAVA 8 TREEIFICATION MATTERS IN ENTERPRISE SECURITY (DoS Protection):");
        System.out.println("  - In Java 7: Attackers could send 50,000 HTTP parameters with identical hash codes, forcing HashMap.get() into O(n) linear scans, maxing out CPU cores (Hash-DoS Attack).");
        System.out.println("  - In Java 8+: Treeification caps the worst-case collision lookup at O(log n), neutralizing Hash-DoS attacks completely!");

        System.out.println("\n==========================================================================");
    }
}