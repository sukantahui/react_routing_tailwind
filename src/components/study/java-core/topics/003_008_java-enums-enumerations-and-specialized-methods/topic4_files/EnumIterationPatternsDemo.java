/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 4: Iterating Enum Constants: For-Each Loop, Stream Pipelines & Arrays
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

import java.util.Arrays;

public class EnumIterationPatternsDemo {

    public enum WeekdaySchedule {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ENUM ITERATION PATTERNS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Iterating with Enhanced For-Each Loop over values():");
        for (WeekdaySchedule day : WeekdaySchedule.values()) {
            boolean isWeekend = (day == WeekdaySchedule.SATURDAY || day == WeekdaySchedule.SUNDAY);
            System.out.printf("  Day: %-10s | Mode: %s%n", day, isWeekend ? "Weekend Lab / Rest" : "Classroom Lecture");
        }

        System.out.println("\n>>> 2. Modern Java 8+ Stream Processing over Enum Constants:");
        long weekendCount = Arrays.stream(WeekdaySchedule.values())
                .filter(d -> d == WeekdaySchedule.SATURDAY || d == WeekdaySchedule.SUNDAY)
                .count();

        System.out.println("  Total Weekend Days in Schedule: " + weekendCount);

        System.out.println("\n==========================================================================");
    }
}