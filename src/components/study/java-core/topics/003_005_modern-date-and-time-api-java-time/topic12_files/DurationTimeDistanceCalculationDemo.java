/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 12: Measuring Time-Based Distance: java.time.Duration (Hours, Minutes, Seconds)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;

public class DurationTimeDistanceCalculationDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: java.time.Duration TIME DISTANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Measuring Distance Between LocalTimes:
        LocalTime examStart = LocalTime.of(10, 0, 0); // 10:00 AM
        LocalTime examEnd   = LocalTime.of(13, 30, 0); // 01:30 PM

        Duration examDuration = Duration.between(examStart, examEnd);

        System.out.println(">>> 1. Exam Session Duration:");
        System.out.println("  Total Duration : " + examDuration.toHours() + " Hours and " + (examDuration.toMinutes() % 60) + " Minutes");
        System.out.println("  Total Minutes  : " + examDuration.toMinutes() + " mins");
        System.out.println("  Total Seconds  : " + examDuration.toSeconds() + " secs");

        // 2. High-Precision Code Execution Benchmarking with Instant:
        Instant t1 = Instant.now();
        Thread.sleep(50); // Simulating work
        Instant t2 = Instant.now();

        Duration elapsed = Duration.between(t1, t2);
        System.out.printf("\n>>> 2. Benchmark Elapsed Time: %d ms (%d ns)%n",
                elapsed.toMillis(), elapsed.toNanos());

        System.out.println("\n>>> SUMMARY: Period = Date (Years/Months/Days) vs Duration = Time (Hours/Mins/Secs/Nanos).");

        System.out.println("\n==========================================================================");
    }
}