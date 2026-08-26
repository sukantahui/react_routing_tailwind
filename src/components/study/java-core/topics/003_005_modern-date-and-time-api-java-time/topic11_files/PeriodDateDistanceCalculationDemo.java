/**
 * Java Core Tutorial - Module 003_005: Modern Date & Time API (java.time - JSR 310)
 * Topic 11: Measuring Date-Based Distance: java.time.Period (Years, Months, Days)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.datetime;

import java.time.LocalDate;
import java.time.Month;
import java.time.Period;

public class PeriodDateDistanceCalculationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: java.time.Period DATE DISTANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LocalDate studentDob = LocalDate.of(2004, Month.JUNE, 18);
        LocalDate currentDate = LocalDate.of(2026, Month.AUGUST, 26);

        // Calculating Exact Human Age in Years, Months, Days:
        Period age = Period.between(studentDob, currentDate);

        System.out.println(">>> 1. Trainee Age Calculation (Student Swadeep Paul):");
        System.out.println("  Date of Birth : " + studentDob);
        System.out.println("  Current Date  : " + currentDate);
        System.out.printf("  Exact Age     : %d Years, %d Months, %d Days%n",
                age.getYears(), age.getMonths(), age.getDays());

        // Custom Period Construction:
        Period warrantyPeriod = Period.of(2, 6, 0); // 2 Years, 6 Months
        LocalDate warrantyEnd = currentDate.plus(warrantyPeriod);
        System.out.println("\n>>> 2. Applying Warranty Period (+2Y 6M): " + warrantyEnd);

        System.out.println("\n>>> KEY TRAIT: Period measures DATE-BASED units (Years, Months, Days).");

        System.out.println("\n==========================================================================");
    }
}