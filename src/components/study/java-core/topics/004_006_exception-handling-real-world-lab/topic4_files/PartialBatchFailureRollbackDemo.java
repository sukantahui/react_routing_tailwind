/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 4: Handling Partial Batch Failures & Atomic Rollback Signals in Enterprise Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.util.ArrayList;
import java.util.List;

public class PartialBatchFailureRollbackDemo {

    public static class StudentAdmissionItem {
        public final String name;
        public final int fee;
        public StudentAdmissionItem(String name, int fee) {
            this.name = name;
            this.fee = fee;
        }
    }

    public static class BatchRollbackException extends Exception {
        private final int failedIndex;
        private final List<String> successfullyEnrolledBeforeRollback;

        public BatchRollbackException(String msg, int index, List<String> enrolled, Throwable cause) {
            super(msg, cause);
            this.failedIndex = index;
            this.successfullyEnrolledBeforeRollback = new ArrayList<>(enrolled);
        }

        public int getFailedIndex() { return failedIndex; }
        public List<String> getSuccessfullyEnrolledBeforeRollback() { return successfullyEnrolledBeforeRollback; }
    }

    public static void executeAtomicBatchAdmission(List<StudentAdmissionItem> batch) throws BatchRollbackException {
        System.out.println("  [BATCH START] Processing batch of " + batch.size() + " admissions atomically...");
        List<String> committedStudents = new ArrayList<>();

        for (int i = 0; i < batch.size(); i++) {
            StudentAdmissionItem item = batch.get(i);
            try {
                if (item.fee <= 0) {
                    throw new IllegalArgumentException("Invalid fee for student: " + item.name);
                }
                committedStudents.add(item.name);
                System.out.println("    [INSERTED] Item #" + (i + 1) + ": " + item.name + " (" + item.fee + " INR)");
            } catch (Exception itemEx) {
                System.out.printf("  [BATCH ERROR AT ITEM #%d] %s%n", i + 1, itemEx.getMessage());
                System.out.println("  [ROLLBACK INITIATED] Reverting all previous " + committedStudents.size() + " inserts...");

                // Execute compensatory rollback logic:
                for (String rolledBack : committedStudents) {
                    System.out.println("    [REVERTED] Deleted provisional record for: " + rolledBack);
                }

                throw new BatchRollbackException(
                        "Batch transaction aborted and rolled back due to error at index " + i,
                        i,
                        committedStudents,
                        itemEx
                );
            }
        }

        System.out.println("  [BATCH COMMITTED] All records processed successfully.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ATOMIC BATCH ROLLBACK SIGNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentAdmissionItem> batch = new ArrayList<>();
        batch.add(new StudentAdmissionItem("Swadeep Paul", 8000));
        batch.add(new StudentAdmissionItem("Tuhina Das", 8000));
        batch.add(new StudentAdmissionItem("Corrupted Entry", -500)); // Will trigger rollback!
        batch.add(new StudentAdmissionItem("Abhronila Das", 8000));

        try {
            executeAtomicBatchAdmission(batch);
        } catch (BatchRollbackException e) {
            System.out.println("\n>>> SUPERVISOR AUDIT REPORT:");
            System.out.println("  Audit Message    : " + e.getMessage());
            System.out.println("  Failed Index     : " + e.getFailedIndex());
            System.out.println("  Reverted Students: " + e.getSuccessfullyEnrolledBeforeRollback());
            System.out.println("  Root Cause       : " + e.getCause().getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}