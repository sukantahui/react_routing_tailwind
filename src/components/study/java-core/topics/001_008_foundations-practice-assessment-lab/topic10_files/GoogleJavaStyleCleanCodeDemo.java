/**
 * File: GoogleJavaStyleCleanCodeDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 10)
 * Description: Demonstrates professional, clean, idiomatic Java conforming strictly to the Google Java Style Guide:
 *              1. Naming Conventions (UpperCamelCase, lowerCamelCase, UPPER_SNAKE_CASE)
 *              2. 2-Space Indentation, 100-character column limits, and Egyptian Braces
 *              3. Eliminating wildcard imports and magic numbers via static constants
 *              4. Comprehensive Javadoc documentation with @param and @return tags
 *              5. Defensive validation and guard clauses
 *              for student tuition ledger & academic reports at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Manages student academic records and tuition fee computations conforming to Google Java Style.
 */
public final class GoogleJavaStyleCleanCodeDemo {

  // ===========================================================================
  // CONSTANTS: UPPER_SNAKE_CASE (No Magic Numbers)
  // ===========================================================================
  public static final String INSTITUTE_NAME = "Coder & AccoTax";
  public static final String CAMPUS_LOCATION = "Barrackpore, West Bengal";
  public static final double GST_TAX_RATE = 0.18; // 18% GST in India
  public static final double MERIT_DISCOUNT_THRESHOLD = 90.0; // 90% score threshold
  public static final double MERIT_DISCOUNT_PERCENTAGE = 0.15; // 15% tuition waiver

  // Private constructor prevents instantiation of utility class
  private GoogleJavaStyleCleanCodeDemo() {}

  // ===========================================================================
  // IMMUTABLE DATA MODEL: Java Record (UpperCamelCase)
  // ===========================================================================
  public record StudentLedgerEntry(
      int rollNumber,
      String studentName,
      String courseName,
      double baseFeeInr,
      double academicScore) {

    public StudentLedgerEntry {
      Objects.requireNonNull(studentName, "studentName must not be null");
      Objects.requireNonNull(courseName, "courseName must not be null");
      if (rollNumber <= 0) {
        throw new IllegalArgumentException("rollNumber must be positive: " + rollNumber);
      }
      if (baseFeeInr < 0.0) {
        throw new IllegalArgumentException("baseFeeInr cannot be negative: " + baseFeeInr);
      }
    }
  }

  // ===========================================================================
  // BUSINESS LOGIC: Clean Methods with Javadoc and Guard Clauses
  // ===========================================================================

  /**
   * Computes the final net payable fee in Indian Rupees (₹) after merit discounts and GST tax.
   *
   * @param entry the immutable student ledger entry containing base fee and academic score
   * @return the final payable tuition fee rounded to two decimal places
   * @throws NullPointerException if entry is null
   */
  public static double computeFinalPayableFee(StudentLedgerEntry entry) {
    Objects.requireNonNull(entry, "StudentLedgerEntry must not be null");

    double baseFee = entry.baseFeeInr();
    double discountAmount = 0.0;

    // Apply merit scholarship if eligible
    if (entry.academicScore() >= MERIT_DISCOUNT_THRESHOLD) {
      discountAmount = baseFee * MERIT_DISCOUNT_PERCENTAGE;
    }

    double discountedBase = baseFee - discountAmount;
    double taxAmount = discountedBase * GST_TAX_RATE;
    return discountedBase + taxAmount;
  }

  /**
   * Formats a complete student invoice summary conforming to Google Java Style.
   *
   * @param entry the student ledger record
   * @return formatted multi-line invoice string
   */
  public static String generateInvoiceReport(StudentLedgerEntry entry) {
    Objects.requireNonNull(entry, "entry cannot be null");
    double finalPayable = computeFinalPayableFee(entry);
    boolean hasMerit = entry.academicScore() >= MERIT_DISCOUNT_THRESHOLD;

    return String.format(
        "[%s - %s]%n"
            + "  Roll Number : #%03d%n"
            + "  Student Name: %s%n"
            + "  Course      : %s%n"
            + "  Score       : %.2f%%%n"
            + "  Base Fee    : ₹%,.2f%n"
            + "  Scholarship : %s%n"
            + "  Net Payable : ₹%,.2f (incl. 18%% GST)%n",
        INSTITUTE_NAME,
        CAMPUS_LOCATION,
        entry.rollNumber(),
        entry.studentName(),
        entry.courseName(),
        entry.academicScore(),
        entry.baseFeeInr(),
        hasMerit ? "15% Merit Waiver Applied" : "None",
        finalPayable);
  }

  public static void main(String[] args) {
    System.out.println("================================================================================");
    System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 GOOGLE JAVA STYLE CLEAN CODE");
    System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
    System.out.println("================================================================================\n");

    List<StudentLedgerEntry> studentList = List.of(
        new StudentLedgerEntry(101, "Swadeep", "Full Stack Java", 20000.0, 92.5),
        new StudentLedgerEntry(102, "Tuhina", "Data Structures & Java", 25000.0, 96.0),
        new StudentLedgerEntry(103, "Abhronila", "Java Core Foundations", 18000.0, 84.0),
        new StudentLedgerEntry(104, "Debangshu", "Java Microservices", 22000.0, 78.5)
    );

    double totalRevenue = 0.0;
    for (StudentLedgerEntry student : studentList) {
      System.out.println(generateInvoiceReport(student));
      totalRevenue += computeFinalPayableFee(student);
    }

    System.out.println("--------------------------------------------------------------------------------");
    System.out.printf("TOTAL BARRACKPORE CAMPUS NET REVENUE: ₹%,.2f%n", totalRevenue);
    System.out.println("================================================================================\n");

    System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
    System.out.println("1. Use 2-space indentation, Egyptian braces, and 100-character line limits.");
    System.out.println("2. Never use wildcard imports (import java.util.*;) - specify exact classes.");
    System.out.println("3. Eliminate magic numbers by defining static final UPPER_SNAKE_CASE constants.");
    System.out.println("4. Guard every public method defensively using Objects.requireNonNull().");
    System.out.println("================================================================================");
  }
}
