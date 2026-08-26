/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 10: Anonymous Classes in Callbacks, Event Listeners & Legacy Multithreading
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class AnonymousCallbacksAndListenersDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ANONYMOUS CALLBACKS & THREADING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Legacy Multithreading using Anonymous Runnable:
        Thread backgroundWorker = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("  [ASYNC THREAD] Generating Barrackpore attendance ledger in background...");
            }
        });
        backgroundWorker.start();
        backgroundWorker.join();

        // 2. Custom Sorting with Anonymous Comparator:
        List<String> trainees = new ArrayList<>();
        trainees.add("Swadeep Paul (Barrackpore)");
        trainees.add("Tuhina Das (Naihati)");
        trainees.add("Abhronila Das (Shyamnagar)");
        trainees.add("Debangshu Mukherjee (Ichapur)");

        // Anonymous Comparator sorting by name length:
        Collections.sort(trainees, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return Integer.compare(s1.length(), s2.length());
            }
        });

        System.out.println("\n>>> 2. Trainees Sorted by Length via Anonymous Comparator:");
        for (String trainee : trainees) {
            System.out.println("  - " + trainee);
        }

        System.out.println("\n==========================================================================");
    }
}