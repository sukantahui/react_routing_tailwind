/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 10: java.util.ArrayDeque: Resizable Circular Array Buffer & Head/Tail Pointers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.ArrayDeque;
import java.util.Arrays;

public class ArrayDequeCircularBufferInternalsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ArrayDeque CIRCULAR ARRAY BUFFER INTERNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ArrayDeque<String> circularDeque = new ArrayDeque<>(8);

        // Add elements to observe head and tail wrapping:
        circularDeque.addLast("Item 1");
        circularDeque.addLast("Item 2");
        circularDeque.addFirst("Item 0 (Wraps around to end of circular array!)");

        // Inspecting private Object[] elements, int head, and int tail in ArrayDeque:
        Field elementsField = ArrayDeque.class.getDeclaredField("elements");
        elementsField.setAccessible(true);
        Object[] elementsArray = (Object[]) elementsField.get(circularDeque);

        Field headField = ArrayDeque.class.getDeclaredField("head");
        headField.setAccessible(true);
        int headIndex = (int) headField.get(circularDeque);

        Field tailField = ArrayDeque.class.getDeclaredField("tail");
        tailField.setAccessible(true);
        int tailIndex = (int) tailField.get(circularDeque);

        System.out.println(">>> 1. Reflecting Inside ArrayDeque's Circular Buffer:");
        System.out.println("  Internal Array Length : " + elementsArray.length);
        System.out.println("  Head Pointer Index    : " + headIndex);
        System.out.println("  Tail Pointer Index    : " + tailIndex);
        System.out.println("  Raw Buffer Elements   : " + Arrays.toString(elementsArray));

        System.out.println("\n>>> HOW CIRCULAR ARRAY BUFFERING WORKS:");
        System.out.println("  1. 'head' pointer moves LEFT on addFirst(): 'head = (head - 1) & (elements.length - 1)' (wraps around circularly).");
        System.out.println("  2. 'tail' pointer moves RIGHT on addLast(): 'tail = (tail + 1) & (elements.length - 1)'.");
        System.out.println("  3. Zero Element Shifts: Neither addFirst nor addLast ever calls System.arraycopy for shifting—only pointer increments!");

        System.out.println("\n==========================================================================");
    }
}