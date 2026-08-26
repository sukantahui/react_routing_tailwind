/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 3: The Work-Stealing Algorithm in ForkJoinPool
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

public class WorkStealingAlgorithmDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: WORK-STEALING ALGORITHM - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW WORK-STEALING PREVENTS IDLE CPU CORES:");
        System.out.println("  1. Each worker thread maintains its own private Double-Ended Queue (Deque).");
        System.out.println("  2. The owning thread pushes and pops sub-tasks from the HEAD (LIFO order - cache friendly).");
        System.out.println("  3. When an idle thread runs out of work, it becomes a 'Thief'.");
        System.out.println("  4. The Thief STEALS tasks from the TAIL of another busy thread's Deque (FIFO order).");
        System.out.println("  5. Result: Minimal lock contention and automatic dynamic load balancing!\n");

        int[] array = new int[10_000];
        for (int i = 0; i < array.length; i++) array[i] = 1;

        ForkJoinPool pool = ForkJoinPool.commonPool();
        SumTask rootTask = new SumTask(array, 0, array.length);
        int totalSum = pool.invoke(rootTask);

        System.out.println(">>> ForkJoin Recursive Sum computed: " + totalSum);
        System.out.println("==========================================================================");
    }

    static class SumTask extends RecursiveTask<Integer> {
        private static final int THRESHOLD = 1000;
        private final int[] arr;
        private final int start, end;

        public SumTask(int[] arr, int start, int end) {
            this.arr = arr;
            this.start = start;
            this.end = end;
        }

        @Override
        protected Integer compute() {
            if (end - start <= THRESHOLD) {
                int sum = 0;
                for (int i = start; i < end; i++) sum += arr[i];
                return sum;
            } else {
                int mid = start + (end - start) / 2;
                SumTask left = new SumTask(arr, start, mid);
                SumTask right = new SumTask(arr, mid, end);
                left.fork(); // Async submit
                return right.compute() + left.join(); // Compute right synchronously & join left
            }
        }
    }
}
