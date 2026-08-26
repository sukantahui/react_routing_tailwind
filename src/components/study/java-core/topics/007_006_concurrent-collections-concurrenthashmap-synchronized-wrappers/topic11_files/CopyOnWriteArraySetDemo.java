/**
 * Java Core Tutorial - Module 007_006: Concurrent Collections & ConcurrentHashMap
 * Topic 11: java.util.concurrent.CopyOnWriteArraySet: Backed by CopyOnWriteArrayList
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class CopyOnWriteArraySetDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: CopyOnWriteArraySet ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Ideal for Notification Observer Registries & Security Permission Sets:
        Set<String> notificationSubscribers = new CopyOnWriteArraySet<>();

        notificationSubscribers.add("Swadeep (Barrackpore)");
        notificationSubscribers.add("Tuhina (Naihati)");
        notificationSubscribers.add("Swadeep (Barrackpore)"); // Set rejects duplicates!

        System.out.println(">>> 1. Subscriber Set State (Duplicates Enforced):");
        System.out.println("  Subscribers: " + notificationSubscribers);

        // Safe concurrent iteration while simultaneously adding new subscribers:
        System.out.println("\n>>> 2. Concurrent Iteration & Mutation (Zero ConcurrentModificationException):");
        Iterator<String> it = notificationSubscribers.iterator();

        // Mutating set while iterator is open:
        notificationSubscribers.add("Abhronila (Shyamnagar)");

        while (it.hasNext()) {
            System.out.println("  Dispatching SMS to Snapshot Subscriber: " + it.next());
        }

        System.out.println("\n>>> Updated Set State: " + notificationSubscribers);

        System.out.println("\n>>> HOW CopyOnWriteArraySet WORKS:");
        System.out.println("  1. Backed by CopyOnWriteArrayList: Uses 'addIfAbsent()' on backing array list.");
        System.out.println("  2. Lock-Free Reads & Iteration    : Reads traverse array snapshot with ZERO locks.");
        System.out.println("  3. Best Use Case                 : Read-heavy sets (e.g. registered listeners, security roles).");

        System.out.println("\n==========================================================================");
    }
}