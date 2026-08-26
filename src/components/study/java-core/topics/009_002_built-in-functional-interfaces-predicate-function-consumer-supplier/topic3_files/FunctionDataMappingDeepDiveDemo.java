/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 3: java.util.function.Function<T, R>: R apply(T t) Data Mapping & Transformation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

class CourseEnrollment {
    final String studentName;
    final double rawFee;

    public CourseEnrollment(String studentName, double rawFee) {
        this.studentName = studentName;
        this.rawFee = rawFee;
    }
}

public class FunctionDataMappingDeepDiveDemo {

    // Reusable generic transformer function:
    public static <T, R> List<R> mapList(List<T> source, Function<T, R> mapper) {
        List<R> results = new ArrayList<>();
        for (T item : source) {
            results.add(mapper.apply(item));
        }
        return results;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: Function<T, R> DATA MAPPING DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<CourseEnrollment> enrollments = List.of(
                new CourseEnrollment("Swadeep Paul", 15000.0),
                new CourseEnrollment("Tuhina Das", 22000.0),
                new CourseEnrollment("Abhronila Das", 18000.0)
        );

        // Transformation 1: CourseEnrollment -> String (Extract Student Names)
        Function<CourseEnrollment, String> nameExtractor = enrollment -> enrollment.studentName;
        List<String> studentNames = mapList(enrollments, nameExtractor);
        System.out.println(">>> 1. Extracted Student Names : " + studentNames);

        // Transformation 2: CourseEnrollment -> Double (Calculate 18% GST on fees)
        Function<CourseEnrollment, Double> gstCalculator = enrollment -> enrollment.rawFee * 0.18;
        List<Double> gstAmounts = mapList(enrollments, gstCalculator);
        System.out.println(">>> 2. Calculated GST Amounts  : " + gstAmounts);

        System.out.println("\n==========================================================================");
    }
}