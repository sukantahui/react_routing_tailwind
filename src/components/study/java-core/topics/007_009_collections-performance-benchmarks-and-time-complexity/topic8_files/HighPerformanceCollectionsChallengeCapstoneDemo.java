/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 8: Timed High-Performance Collections Coding Challenge (Segment 7 Grand Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class HighPerformanceCollectionsChallengeCapstoneDemo {

    // CHALLENGE 1: Find Top K Frequent Elements in O(N log K) time:
    public static List<String> findTopKFrequent(String[] words, int k) {
        // Step 1: Frequency Map O(N):
        Map<String, Integer> freqMap = new HashMap<>();
        for (String w : words) {
            freqMap.put(w, freqMap.getOrDefault(w, 0) + 1);
        }

        // Step 2: Min-Heap of size K (PriorityQueue) O(N log K):
        PriorityQueue<String> minHeap = new PriorityQueue<>(
                Comparator.comparingInt(freqMap::get).thenComparing(Comparator.reverseOrder())
        );

        for (String word : freqMap.keySet()) {
            minHeap.offer(word);
            if (minHeap.size() > k) {
                minHeap.poll(); // Evicts lowest frequency element
            }
        }

        // Step 3: Extract from Min-Heap:
        List<String> topK = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            topK.add(0, minHeap.poll()); // Add at head for descending order
        }
        return topK;
    }

    // CHALLENGE 2: High-Speed Balanced Parentheses Validator using ArrayDeque Stack in O(N) time:
    public static boolean isValidParentheses(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: HIGH-PERFORMANCE COLLECTIONS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Executing Challenge 1 (Top K Frequent):
        String[] trainingQueries = {
                "Java", "Spring", "Java", "Docker", "Java", "Kubernetes", "Spring", "Kafka", "Spring"
        };
        List<String> top2 = findTopKFrequent(trainingQueries, 2);
        System.out.println(">>> 1. Top 2 Frequent Training Topics: " + top2);

        // 2. Executing Challenge 2 (ArrayDeque Stack Parentheses):
        String validExpr = "{[()()]}";
        String invalidExpr = "{[(])}";
        System.out.println("\n>>> 2. ArrayDeque Stack Parentheses Validation:");
        System.out.printf("  Expression '%s' -> Valid: %b%n", validExpr, isValidParentheses(validExpr));
        System.out.printf("  Expression '%s' -> Valid: %b%n", invalidExpr, isValidParentheses(invalidExpr));

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 CONGRATULATIONS! SEGMENT 7 (ALL 9 MODULES, 125 TOPICS) 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}