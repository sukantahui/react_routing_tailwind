/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 8: Rules of this() call: Must Be the Very First Statement in Constructor Body
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class ThisCallFirstStatementRulesDemo {

    public static class SmartAccount {
        private final String accountHolder;
        private final double initialBalance;
        private final String branchCode;

        // Valid: this() as strict line 1
        public SmartAccount(String accountHolder) {
            this(accountHolder, 500.0, "BARRACKPORE-01"); // Line 1: VALID!
            System.out.println("  [POST-INIT] Custom welcome email dispatched to: " + accountHolder);
        }

        // Master Constructor
        public SmartAccount(String accountHolder, double initialBalance, String branchCode) {
            this.accountHolder = accountHolder;
            this.initialBalance = initialBalance;
            this.branchCode = branchCode;
            System.out.printf("  [ACCOUNT CREATED] Holder: %s | Bal: ₹%.2f | Branch: %s\n",
                    accountHolder, initialBalance, branchCode);
        }

        // Demonstration of Helper function used inside this() argument
        // (Must be STATIC because instance does not exist yet)
        public static String formatBranch(String hubName) {
            return "HUB-" + hubName.toUpperCase().replace(" ", "_");
        }

        public SmartAccount(String name, String hubName) {
            this(name, 1000.0, formatBranch(hubName)); // Calling static helper inside this() is VALID!
        }

        public void printInfo() {
            System.out.printf("  -> %s | Balance: ₹%.2f | %s\n", accountHolder, initialBalance, branchCode);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: RULES OF this() CALL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating account for Swadeep with 1-arg constructor (calls this() on line 1):");
        SmartAccount a1 = new SmartAccount("Swadeep Paul");
        a1.printInfo();

        System.out.println("\n>>> 2. Creating account with static helper evaluated in this() argument:");
        SmartAccount a2 = new SmartAccount("Tuhina Das", "Shyamnagar East");
        a2.printInfo();

        System.out.println("\n>>> 3. Compiler Rules Summary:");
        System.out.println("  - Rule 1: 'this(...)' MUST be on statement 1.");
        System.out.println("  - Rule 2: Cannot access instance variables or instance methods in this(...) arguments.");
        System.out.println("  - Rule 3: Static methods/constants CAN be passed into this(...).");
        System.out.println("  - Rule 4: 'this()' and 'super()' cannot coexist in the same constructor.");

        System.out.println("\n==========================================================================");
    }
}