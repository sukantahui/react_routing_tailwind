/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 7: @Repeatable Annotations (Java 8+) - Container Annotation Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Method;

public class RepeatableAnnotationsJava8Demo {

    // 1. Container Annotation (Holds an array of repeated annotations):
    @Retention(RetentionPolicy.RUNTIME)
    public @interface BatchTimetables {
        BatchTimetable[] value();
    }

    // 2. Repeatable Annotation: References its container annotation class
    @Repeatable(BatchTimetables.class)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface BatchTimetable {
        String day();
        String time();
        String center() default "Barrackpore";
    }

    // 3. Applying REPEATED annotations on a single method cleanly:
    public static class CourseScheduler {

        @BatchTimetable(day = "Monday", time = "10:00 AM", center = "Barrackpore")
        @BatchTimetable(day = "Wednesday", time = "02:00 PM", center = "Naihati")
        @BatchTimetable(day = "Saturday", time = "04:30 PM", center = "Shyamnagar")
        public void scheduleJavaCoreBatch() {
            System.out.println("Java Core batch schedules active across multiple centers!");
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: @REPEATABLE ANNOTATIONS (JAVA 8+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Method method = CourseScheduler.class.getMethod("scheduleJavaCoreBatch");

        // Reading repeated annotations via getAnnotationsByType() [Java 8]:
        BatchTimetable[] schedules = method.getAnnotationsByType(BatchTimetable.class);

        System.out.println(">>> 1. DISCOVERED REPEATED SCHEDULES VIA getAnnotationsByType():");
        for (BatchTimetable s : schedules) {
            System.out.println("   - Day: " + s.day() + " | Time: " + s.time() + " | Center: " + s.center());
        }

        // Under the hood: It is stored in the container annotation @BatchTimetables!
        BatchTimetables container = method.getAnnotation(BatchTimetables.class);
        System.out.println("\n>>> 2. Under the hood Container Annotation:");
        System.out.println("   - Container Class: " + container.getClass().getSimpleName());
        System.out.println("   - Contained Elements Count: " + container.value().length);

        System.out.println("\n==========================================================================");
    }
}
