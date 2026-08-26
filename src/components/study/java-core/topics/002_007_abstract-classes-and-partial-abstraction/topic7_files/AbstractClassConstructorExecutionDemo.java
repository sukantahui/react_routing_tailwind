/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 7: Constructors in Abstract Classes: Purpose and Execution via Child super()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractClassConstructorExecutionDemo {

    public abstract static class AcademyTrainee {
        protected int traineeId;
        protected String traineeName;
        protected String centerBranch;

        // CONSTRUCTOR IN ABSTRACT CLASS:
        // Even though this class cannot be instantiated directly with 'new',
        // its constructor is REQUIRED to initialize its instance variables when
        // a concrete subclass invokes 'super(...)'.
        public AcademyTrainee(int id, String name, String branch) {
            this.traineeId = id;
            this.traineeName = name;
            this.centerBranch = branch;
            System.out.printf("  [ABSTRACT CONSTRUCTOR] Initialized base trainee state: ID=%d, Name=%s @ %s\n",
                    id, name, branch);
        }

        public abstract void printIdCard();
    }

    public static class FullStackTrainee extends AcademyTrainee {
        private String cloudLabId;

        public FullStackTrainee(int id, String name, String branch, String cloudLabId) {
            super(id, name, branch); // Invokes Abstract Superclass Constructor!
            this.cloudLabId = cloudLabId;
            System.out.println("  [CHILD CONSTRUCTOR] FullStackTrainee ready with Cloud Lab: " + cloudLabId);
        }

        @Override
        public void printIdCard() {
            System.out.printf("  -> CARD: [%d] %s (%s) | Cloud Sandbox: %s\n",
                    traineeId, traineeName, centerBranch, cloudLabId);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ABSTRACT CLASS CONSTRUCTORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FullStackTrainee trainee = new FullStackTrainee(101, "Swadeep Paul", "Barrackpore Hub", "AWS-BKP-01");
        trainee.printIdCard();

        System.out.println("\n==========================================================================");
    }
}