/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 5: Fail-Fast Verification: expectedModCount vs modCount in Iterator.next()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class ExpectedModCountVerificationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: expectedModCount vs modCount VERIFICATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> EXACT JDK SOURCE CODE FOR ArrayList$Itr:");
        System.out.println("  private class Itr implements Iterator<E> {");
        System.out.println("      int cursor;       // index of next element to return");
        System.out.println("      int lastRet = -1; // index of last element returned");
        System.out.println("      int expectedModCount = modCount; // SNAPSHOT VERSION AT ITERATOR CREATION!");
        System.out.println();
        System.out.println("      public E next() {");
        System.out.println("          checkForComodification(); // STEP 1: VERIFY INTEGRITY");
        System.out.println("          int i = cursor;");
        System.out.println("          // ... fetch element and advance cursor ...");
        System.out.println("          return (E) elementData[lastRet = i];");
        System.out.println("      }");
        System.out.println();
        System.out.println("      final void checkForComodification() {");
        System.out.println("          if (modCount != expectedModCount)");
        System.out.println("              throw new ConcurrentModificationException();");
        System.out.println("      }");
        System.out.println("  }");

        System.out.println("\n>>> WHY checkForComodification() IS EXTREMELY FAST:");
        System.out.println("  - It is a single 1-cycle integer comparison: 'modCount != expectedModCount'.");
        System.out.println("  - Zero memory allocation overhead during iteration.");
        System.out.println("  - Guarantees immediate detection of concurrent modifications.");

        System.out.println("\n==========================================================================");
    }
}