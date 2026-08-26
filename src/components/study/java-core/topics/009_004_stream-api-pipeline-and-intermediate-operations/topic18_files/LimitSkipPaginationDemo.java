/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 18: limit() & skip() - Stream Truncation & Functional Pagination
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;

public class LimitSkipPaginationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: LIMIT() & SKIP() PAGINATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentDirectory = List.of(
            "1. Swadeep Paul", "2. Tuhina Das", "3. Abhronila Das", 
            "4. Debangshu Mukherjee", "5. Priya Sharma", "6. Anish Dey", 
            "7. Rahul Roy", "8. Sneha Sen", "9. Bikram Ghosh", "10. Riya Das"
        );

        // 1. limit(maxSize): Truncates stream to at most N elements
        System.out.println("1. Top 3 Students via limit(3):");
        studentDirectory.stream()
            .limit(3)
            .forEach(s -> System.out.println("   " + s));

        // 2. skip(n): Discards first N elements
        System.out.println("\n2. Students after skipping first 7 via skip(7):");
        studentDirectory.stream()
            .skip(7)
            .forEach(s -> System.out.println("   " + s));

        // 3. Functional Pagination: Page 2 with PageSize = 3 (skip: (page - 1) * pageSize)
        int pageNumber = 2;
        int pageSize = 3;
        int offset = (pageNumber - 1) * pageSize;

        System.out.println("\n3. Pagination [Page " + pageNumber + ", PageSize " + pageSize + "]:");
        List<String> page2 = studentDirectory.stream()
            .skip(offset)
            .limit(pageSize)
            .toList();
        page2.forEach(s -> System.out.println("   " + s));

        System.out.println("\n==========================================================================");
    }
}
