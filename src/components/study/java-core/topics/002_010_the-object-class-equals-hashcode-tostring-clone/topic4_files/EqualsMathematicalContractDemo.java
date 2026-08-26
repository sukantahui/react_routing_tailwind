/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 4: The Mathematical Contract of equals(): 5 Invariant Properties
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class EqualsMathematicalContractDemo {

    public static class CourseToken {
        private String tokenCode;
        public CourseToken(String code) { this.tokenCode = code; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            CourseToken other = (CourseToken) obj;
            return this.tokenCode != null && this.tokenCode.equals(other.tokenCode);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE 5 LAWS OF THE equals() CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CourseToken x = new CourseToken("JAVA-BKP-2026");
        CourseToken y = new CourseToken("JAVA-BKP-2026");
        CourseToken z = new CourseToken("JAVA-BKP-2026");

        // 1. REFLEXIVE: x.equals(x) MUST be true
        System.out.println("  1. Reflexive  : x.equals(x) -> " + x.equals(x));

        // 2. SYMMETRIC: x.equals(y) == y.equals(x)
        System.out.println("  2. Symmetric  : (x.equals(y) && y.equals(x)) -> " + (x.equals(y) && y.equals(x)));

        // 3. TRANSITIVE: If x.equals(y) && y.equals(z) -> x.equals(z) MUST be true
        System.out.println("  3. Transitive : (x.equals(y) && y.equals(z) => x.equals(z)) -> " + (x.equals(y) && y.equals(z) && x.equals(z)));

        // 4. CONSISTENT: Multiple invocations return the same result if state hasn't changed
        System.out.println("  4. Consistent : x.equals(y) == x.equals(y) -> " + (x.equals(y) == x.equals(y)));

        // 5. NON-NULLITY: x.equals(null) MUST return false (NEVER throw NullPointerException!)
        System.out.println("  5. Non-Nullity: x.equals(null) -> " + x.equals(null));

        System.out.println("\n==========================================================================");
    }
}