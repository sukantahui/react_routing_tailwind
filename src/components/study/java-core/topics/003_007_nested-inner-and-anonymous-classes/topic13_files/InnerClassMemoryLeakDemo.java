/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 13: Inner Classes and Memory Leaks: Hidden Outer References in Event Listeners
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

import java.util.ArrayList;
import java.util.List;

public class InnerClassMemoryLeakDemo {

    // Simulating a long-lived global event listener registry:
    public static final List<Runnable> GLOBAL_EVENT_LISTENERS = new ArrayList<>();

    // A heavy Outer Class representing an entire Academy UI Window with large byte buffers:
    public static class HeavyUiWindow {
        private byte[] largeImageData = new byte[10 * 1024 * 1024]; // 10 MB payload!
        private String windowTitle = "Barrackpore Student Dashboard";

        public void registerLeakingListener() {
            // BAD PRACTICE: Non-static anonymous inner class holds implicit hidden reference to HeavyUiWindow!
            GLOBAL_EVENT_LISTENERS.add(new Runnable() {
                @Override
                public void run() {
                    System.out.println("  Event fired for: " + windowTitle);
                }
            });
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: INNER CLASS MEMORY LEAK DIAGNOSIS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating HeavyUiWindow and Registering Listener:");
        HeavyUiWindow window = new HeavyUiWindow();
        window.registerLeakingListener();

        // Nullifying local reference to HeavyUiWindow:
        window = null;
        System.gc(); // Requesting garbage collection

        System.out.println("\n>>> 2. Memory Leak Analysis:");
        System.out.println("  Even though 'window = null', the 10 MB HeavyUiWindow CANNOT be garbage collected!");
        System.out.println("  Because GLOBAL_EVENT_LISTENERS holds the Runnable, which holds a hidden 'this$0' reference to HeavyUiWindow!");
        System.out.println("\n>>> REMEDY: Use static nested classes or WeakReference in event listeners!");

        System.out.println("\n==========================================================================");
    }
}