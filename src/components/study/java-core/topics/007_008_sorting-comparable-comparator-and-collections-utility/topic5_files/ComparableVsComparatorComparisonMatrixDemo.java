/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 5: When to Choose Comparable vs Comparator: Comprehensive Comparison Matrix
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class ComparableVsComparatorComparisonMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: Comparable vs Comparator MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE COMPARISON MATRIX:");
        System.out.println("+--------------------+---------------------------+---------------------------+");
        System.out.println("| Feature            | java.lang.Comparable<T>   | java.util.Comparator<T>   |");
        System.out.println("+--------------------+---------------------------+---------------------------+");
        System.out.println("| Package            | java.lang (Auto-imported) | java.util (Requires import|");
        System.out.println("| Method Signature   | int compareTo(T o)        | int compare(T o1, T o2)   |");
        System.out.println("| Arguments Count    | 1 argument ('this' vs 'o')| 2 arguments ('o1' vs 'o2')|");
        System.out.println("| Sorting Type       | Natural / Default Sorting | Custom / Strategy Sorting |");
        System.out.println("| Number of Sorts    | Only 1 sort per class     | Unlimited sorting logic   |");
        System.out.println("| Source Code Needed?| YES (Must modify class)   | NO (Works on any class)   |");
        System.out.println("| Lambda Support?    | NO (Class implements it)  | YES (Functional Interface)|");
        System.out.println("| Collection Method  | Collections.sort(list)    | list.sort(comparator)     |");
        System.out.println("+--------------------+---------------------------+---------------------------+");

        System.out.println("\n>>> DECISION GUIDE: WHEN TO USE WHICH:");
        System.out.println("  - Choose Comparable : When there is an obvious, natural default sort order for your entity (e.g. Employee ID, Date chronological order).");
        System.out.println("  - Choose Comparator : When users need to sort by multiple dynamic criteria (e.g. Salary, Name, Joining Date, Department).");

        System.out.println("\n==========================================================================");
    }
}