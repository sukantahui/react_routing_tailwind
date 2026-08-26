/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 8: Contract Rule 1: If a.equals(b) is true, a.hashCode() MUST equal b.hashCode()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.Objects;

public class EqualsImpliesSameHashCodeDemo {

    public static class EnrollmentToken {
        private String tokenCode;
        private int branchCode;

        public EnrollmentToken(String code, int branch) {
            this.tokenCode = code;
            this.branchCode = branch;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            EnrollmentToken other = (EnrollmentToken) obj;
            return branchCode == other.branchCode && Objects.equals(tokenCode, other.tokenCode);
        }

        // MANDATORY RULE 1:
        @Override
        public int hashCode() {
            return Objects.hash(tokenCode, branchCode);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CONTRACT RULE 1: a.equals(b) => SAME HASHCODE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EnrollmentToken t1 = new EnrollmentToken("BKP-JAVA-2026", 101);
        EnrollmentToken t2 = new EnrollmentToken("BKP-JAVA-2026", 101);

        System.out.println("  t1.equals(t2)         : " + t1.equals(t2));
        System.out.println("  t1.hashCode()         : " + t1.hashCode());
        System.out.println("  t2.hashCode()         : " + t2.hashCode());
        System.out.println("  HashCodes are EQUAL   : " + (t1.hashCode() == t2.hashCode()));

        System.out.println("\n==========================================================================");
    }
}