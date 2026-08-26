/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 17: Constructors in Immutable Classes: Safe Final Field Assignment
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class ImmutableClassConstructorSafetyDemo {

    // Immutable Domain Entity
    public static final class ImmutableStudentCertification {
        // All fields are private and final
        private final int certificateId;
        private final String studentName;
        private final String certifiedSkill;
        private final List<String> verifiedTopics;

        // Constructor establishing complete immutability & defensive copying
        public ImmutableStudentCertification(int id, String name, String skill, List<String> topics) {
            if (id <= 0) throw new IllegalArgumentException("ID must be positive.");
            this.certificateId = id;
            this.studentName = Objects.requireNonNull(name, "Name required");
            this.certifiedSkill = Objects.requireNonNull(skill, "Skill required");

            // CRITICAL IMMUTABILITY RULE: Defensive Copy of mutable list
            this.verifiedTopics = Collections.unmodifiableList(new ArrayList<>(topics));

            // NEVER leak 'this' reference to another thread during construction!
            System.out.printf("  [IMMUTABLE CERTIFICATE] Created for: %s | ID: %d\n", this.studentName, this.certificateId);
        }

        // Getters ONLY, zero setters
        public int getCertificateId() { return certificateId; }
        public String getStudentName() { return studentName; }
        public String getCertifiedSkill() { return certifiedSkill; }
        public List<String> getVerifiedTopics() { return verifiedTopics; }

        public void printBadge() {
            System.out.printf("  -> CERT-%04d: %s [%s] Topics: %s\n",
                    certificateId, studentName, certifiedSkill, verifiedTopics);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: IMMUTABLE CLASS CONSTRUCTOR SAFETY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> rawTopics = new ArrayList<>();
        rawTopics.add("OOP Foundations");
        rawTopics.add("Constructor Lifecycle");

        System.out.println(">>> 1. Creating Immutable Certificate for Swadeep Paul:");
        ImmutableStudentCertification cert = new ImmutableStudentCertification(101, "Swadeep Paul", "Java Specialist", rawTopics);
        cert.printBadge();

        System.out.println("\n>>> 2. Attempting to mutate original list after construction:");
        rawTopics.add("Hacked Topic After Construction");
        System.out.println("  Certificate topics remain safe (Defensive Copy): " + cert.getVerifiedTopics());

        System.out.println("\n>>> 3. Attempting to mutate returned list via getter:");
        try {
            cert.getVerifiedTopics().add("Direct Hacker Topic");
        } catch (UnsupportedOperationException ex) {
            System.out.println("  [PROTECTED] Attempting to mutate returned list threw: " + ex.getClass().getSimpleName());
        }

        System.out.println("\n==========================================================================");
    }
}