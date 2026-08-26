/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 9: Refactoring Complex Lambdas into Elegant Method References
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.Objects;

class StudentLedgerRecord {
    final String name;
    final Double feesPaid;

    public StudentLedgerRecord(String name, Double feesPaid) {
        this.name = name;
        this.feesPaid = feesPaid;
    }

    public String getName() {
        return name;
    }

    public Double getFeesPaid() {
        return feesPaid;
    }

    public boolean isFeePaidComplete() {
        return feesPaid != null && feesPaid >= 15000.0;
    }
}

public class RefactoringLambdasToMethodReferencesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: REFACTORING LAMBDAS TO METHOD REFERENCES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentLedgerRecord> roster = List.of(
                new StudentLedgerRecord("Swadeep Paul", 15000.0),
                new StudentLedgerRecord("Tuhina Das", 20000.0),
                new StudentLedgerRecord(null, 5000.0),
                new StudentLedgerRecord("Abhronila Das", 18000.0)
        );

        // BEFORE (Verbose lambda expressions):
        List<String> feePaidStudentsVerbose = roster.stream()
                .filter(record -> record != null)
                .filter(record -> record.isFeePaidComplete())
                .map(record -> record.getName())
                .filter(name -> Objects.nonNull(name))
                .map(name -> name.toUpperCase())
                .toList();

        // AFTER (Clean, declarative method references):
        List<String> feePaidStudentsRefactored = roster.stream()
                .filter(Objects::nonNull)
                .filter(StudentLedgerRecord::isFeePaidComplete)
                .map(StudentLedgerRecord::getName)
                .filter(Objects::nonNull)
                .map(String::toUpperCase)
                .toList();

        System.out.println(">>> 1. Verbose Lambda Result      : " + feePaidStudentsVerbose);
        System.out.println(">>> 2. Refactored MethodRef Result: " + feePaidStudentsRefactored);

        System.out.println("\n==========================================================================");
    }
}