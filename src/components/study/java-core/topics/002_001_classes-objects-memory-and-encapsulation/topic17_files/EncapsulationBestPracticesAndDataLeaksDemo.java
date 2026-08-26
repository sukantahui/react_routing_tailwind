/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 17: Encapsulation Best Practices and Avoiding Data Leaks
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The 5 Major Encapsulation Data Leaks
 * ----------------------------------------------------------------------------
 * Even when all fields are declared `private`, subtle coding mistakes can leak
 * internal mutable state, completely destroying encapsulation:
 *
 * 1. LEAK 1: Constructor Aliasing Leak
 *    - Assigning a mutable constructor parameter directly: `this.skills = inputList;`.
 *    - The caller retains a reference to `inputList` and can mutate internal state externally!
 *    - FIX: Defensive copy on input: `this.skills = new ArrayList<>(inputList);`.
 *
 * 2. LEAK 2: Getter Aliasing Leak
 *    - Returning a direct reference to an internal mutable collection: `return this.skills;`.
 *    - Callers can call `getSkills().clear()`, destroying internal data!
 *    - FIX: Return unmodifiable view: `return Collections.unmodifiableList(this.skills);`.
 *
 * 3. LEAK 3: Array Reference Leak
 *    - Arrays in Java are ALWAYS mutable. Returning `this.scores` leaks the array buffer.
 *    - FIX: Clone the array: `return this.scores.clone();`.
 *
 * 4. LEAK 4: Legacy Mutable Date Leak
 *    - `java.util.Date` is mutable via `.setTime()`.
 *    - FIX: Use modern immutable `java.time.LocalDate` / `Instant`, or defensive copy.
 *
 * 5. LEAK 5: Premature 'this' Escape Leak
 *    - Passing `this` to external listeners or starting threads inside a constructor.
 *    - Other threads can inspect partially initialized, corrupted object state!
 *    - FIX: Complete all construction before publishing `this`.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class EncapsulationBestPracticesAndDataLeaksDemo {

    // ------------------------------------------------------------------------
    // Part 1: THE VULNERABLE CLASS (Riddled with Subtle Data Leaks)
    // ------------------------------------------------------------------------
    public static class VulnerableTraineeProfile {
        // Fields are marked private, but encapsulation is severely broken!
        private String studentName;
        private List<String> enrolledCourses;
        private int[] examScores;
        private Date admissionDate; // Legacy mutable date!

        public VulnerableTraineeProfile(String name, List<String> courses, int[] scores, Date admissionDate) {
            this.studentName = name;
            // LEAK 1: Constructor Aliasing (Caller keeps reference to 'courses'!)
            this.enrolledCourses = courses;
            // LEAK 3: Array Reference Leak (Caller keeps reference to 'scores'!)
            this.examScores = scores;
            // LEAK 4: Date Reference Leak (Caller keeps reference to 'admissionDate'!)
            this.admissionDate = admissionDate;
        }

        // LEAK 2: Getter Aliasing (Caller receives direct internal reference!)
        public List<String> getEnrolledCourses() { return this.enrolledCourses; }
        public int[] getExamScores() { return this.examScores; }
        public Date getAdmissionDate() { return this.admissionDate; }
        public String getStudentName() { return studentName; }

        public void printProfile() {
            System.out.println("    Courses : " + enrolledCourses);
            System.out.print("    Scores  : [");
            if (examScores != null) {
                for (int i = 0; i < examScores.length; i++) {
                    System.out.print(examScores[i] + (i < examScores.length - 1 ? ", " : ""));
                }
            }
            System.out.println("]");
            System.out.println("    Adm Date: " + admissionDate);
        }
    }

    // ------------------------------------------------------------------------
    // Part 2: THE FORTIFIED CLASS (Zero Data Leaks - Production Grade)
    // ------------------------------------------------------------------------
    public static final class FortifiedTraineeProfile {
        // 1. All fields private and final
        private final String studentName;
        private final List<String> enrolledCourses;
        private final int[] examScores;
        private final LocalDate admissionDate; // Modern immutable date!

        // Constructor with Defensive Copies on ALL mutable inputs
        public FortifiedTraineeProfile(String name, List<String> courses, int[] scores, LocalDate admissionDate) {
            this.studentName = Objects.requireNonNull(name, "Name required").trim();

            // SEAL 1: Defensive Copy of Collection on Input
            this.enrolledCourses = (courses != null) ? new ArrayList<>(courses) : new ArrayList<>();

            // SEAL 3: Defensive Clone of Array on Input
            this.examScores = (scores != null) ? scores.clone() : new int[0];

            // SEAL 4: Modern Immutable Date (LocalDate is inherently tamper-proof)
            this.admissionDate = Objects.requireNonNull(admissionDate, "Admission date required");

            // SEAL 5: Construction complete before publishing!
        }

        // Getters with Defensive Output Protection
        public String getStudentName() { return studentName; }

        // SEAL 2: Return Unmodifiable View
        public List<String> getEnrolledCourses() {
            return Collections.unmodifiableList(this.enrolledCourses);
        }

        // SEAL 3: Return Cloned Array
        public int[] getExamScores() {
            return this.examScores.clone();
        }

        // SEAL 4: Return Immutable LocalDate
        public LocalDate getAdmissionDate() {
            return this.admissionDate;
        }

        public void printProfile() {
            System.out.println("    Courses : " + enrolledCourses);
            System.out.print("    Scores  : [");
            for (int i = 0; i < examScores.length; i++) {
                System.out.print(examScores[i] + (i < examScores.length - 1 ? ", " : ""));
            }
            System.out.println("]");
            System.out.println("    Adm Date: " + admissionDate);
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Exploiting Data Leaks vs Verifying Fortified Seals
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: ENCAPSULATION BEST PRACTICES & PREVENTING DATA LEAKS");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Exploiting Data Leaks in Vulnerable Class
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Exploiting 4 Data Leaks in 'VulnerableTraineeProfile' (Swadeep Paul)");

        List<String> callerCourses = new ArrayList<>();
        callerCourses.add("Java Core");
        callerCourses.add("Spring Boot");

        int[] callerScores = { 95, 88, 92 };
        Date callerDate = new Date(); // Current date

        VulnerableTraineeProfile vulnerable = new VulnerableTraineeProfile(
                "Swadeep Paul", callerCourses, callerScores, callerDate
        );

        System.out.println("  [Initial State Inside Vulnerable Object]:");
        vulnerable.printProfile();

        System.out.println("\n  -- [ATTACK 1: Mutating constructor list via caller reference] --");
        callerCourses.add("HACKED_COURSE_INJECTION"); // Modifies object's internal list!

        System.out.println("  -- [ATTACK 2: Mutating array via getter return] --");
        vulnerable.getExamScores()[0] = 0; // Caller zeroes out Swadeep's top score!

        System.out.println("  -- [ATTACK 3: Mutating internal list via getter .clear()] --");
        vulnerable.getEnrolledCourses().clear(); // Wipes out all courses!

        System.out.println("  -- [ATTACK 4: Mutating Date via .setTime()] --");
        callerDate.setTime(0); // Sets admission date back to 01-Jan-1970!

        System.out.println("\n  [CORRUPTED STATE Inside Vulnerable Object After External Attacks]:");
        vulnerable.printProfile();
        System.out.println("  Result: Encapsulation completely failed despite 'private' fields!\n");

        // --------------------------------------------------------------------
        // DEMO 2: Verifying Fortified Seals in Fortified Class
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: Testing Defensive Seals in 'FortifiedTraineeProfile' (Tuhina Das)");

        List<String> secureCourses = new ArrayList<>();
        secureCourses.add("Java Fullstack");
        secureCourses.add("Microservices");

        int[] secureScores = { 98, 94, 96 };
        LocalDate secureDate = LocalDate.now();

        FortifiedTraineeProfile fortified = new FortifiedTraineeProfile(
                "Tuhina Das", secureCourses, secureScores, secureDate
        );

        System.out.println("  [Initial State Inside Fortified Object]:");
        fortified.printProfile();

        System.out.println("\n  -- [TEST 1: Mutating caller's list after passing to constructor] --");
        secureCourses.add("MALICIOUS_INJECTION");
        System.out.println("  Caller list modified. Checking fortified object courses: " + fortified.getEnrolledCourses());

        System.out.println("\n  -- [TEST 2: Attempting to clear list via getter] --");
        try {
            fortified.getEnrolledCourses().clear();
        } catch (UnsupportedOperationException e) {
            System.out.println("  [DEFENSE CONFIRMED] External clear() REJECTED: UnsupportedOperationException!");
        }

        System.out.println("\n  -- [TEST 3: Attempting to mutate array via getter] --");
        int[] extractedScores = fortified.getExamScores();
        extractedScores[0] = 0; // Mutates only the clone!
        System.out.print("  Extracted clone zeroed. Checking fortified object actual scores: ");
        fortified.printProfile();

        System.out.println("\n==========================================================================");
        System.out.println(" ENCAPSULATION BEST PRACTICES & DATA LEAKS COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
