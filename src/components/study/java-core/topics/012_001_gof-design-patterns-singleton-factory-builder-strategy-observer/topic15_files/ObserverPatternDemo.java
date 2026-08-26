/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 15: The Observer Pattern - Publish-Subscribe Notifications
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

import java.util.ArrayList;
import java.util.List;

public class ObserverPatternDemo {

    // 1. Observer Interface:
    public interface ExamResultObserver {
        void onResultPublished(String studentName, double score, String center);
    }

    // 2. Subject / Publisher:
    public static class ExamNotificationCenter {
        private final List<ExamResultObserver> observers = new ArrayList<>();

        public void subscribe(ExamResultObserver observer) {
            observers.add(observer);
        }

        public void unsubscribe(ExamResultObserver observer) {
            observers.remove(observer);
        }

        public void publishResult(String studentName, double score, String center) {
            System.out.println(">>> [PUBLISHER]: Publishing Exam Result for " + studentName + " (Score: " + score + ")...");
            for (ExamResultObserver obs : observers) {
                obs.onResultPublished(studentName, score, center);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: OBSERVER DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        ExamNotificationCenter publisher = new ExamNotificationCenter();

        // Registering multiple independent subscribers:
        publisher.subscribe((name, score, center) ->
            System.out.println("   [SMS DISPATCHER]: SMS sent to " + name + " -> Score: " + score)
        );

        publisher.subscribe((name, score, center) ->
            System.out.println("   [SCHOLARSHIP PORTAL]: Verified merit eligibility at " + center)
        );

        publisher.publishResult("Swadeep Paul", 96.5, "Barrackpore");

        System.out.println("==========================================================================");
    }
}
