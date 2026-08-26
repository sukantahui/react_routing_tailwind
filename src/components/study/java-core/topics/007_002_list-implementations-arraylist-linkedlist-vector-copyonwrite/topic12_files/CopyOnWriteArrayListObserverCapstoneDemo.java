/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 12: java.util.concurrent.CopyOnWriteArrayList: Lock-Free Reads & Immutable Snapshots (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CopyOnWriteArrayListObserverCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: CopyOnWriteArrayList ARCHITECTURE (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Ideal for Observer / Event Listener Registries:
        List<String> eventListeners = new CopyOnWriteArrayList<>();
        eventListeners.add("AuditLogListener (Barrackpore)");
        eventListeners.add("EmailNotificationListener (Naihati)");
        eventListeners.add("SmsAlertListener (Shyamnagar)");

        System.out.println(">>> 1. Safe Concurrent Iteration & In-Flight Mutation (Zero ConcurrentModificationException):");
        Iterator<String> snapshotIterator = eventListeners.iterator();

        // Adding an element WHILE iterating:
        eventListeners.add("WebhookDispatchListener (Ichapur)");

        System.out.println(">>> Iterating over snapshot view:");
        while (snapshotIterator.hasNext()) {
            System.out.println("  Notifying: " + snapshotIterator.next());
        }

        System.out.println("\n>>> Updated List Content (Reflects newly added listener):");
        System.out.println("  " + eventListeners);

        System.out.println("\n>>> ARCHITECTURAL MECHANICS OF CopyOnWriteArrayList:");
        System.out.println("  1. Lock-Free Ultra-Fast Reads: 'get()' and iteration access the current array snapshot directly with ZERO locking or synchronization!");
        System.out.println("  2. Copy-On-Write Mutation   : Every 'add()', 'set()', or 'remove()' acquires a reentrant lock, copies the entire array, mutates the clone, and replaces the array reference atomically (volatile pointer swap).");
        System.out.println("  3. Snapshot Iterators       : Iterators never throw 'ConcurrentModificationException' and do not reflect modifications made after iterator creation.");
        System.out.println("  4. Ideal Use Case           : Event listener lists and cached lookup tables where reads vastly outnumber writes (99% reads, 1% writes).");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 007_002 LIST IMPLEMENTATIONS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}