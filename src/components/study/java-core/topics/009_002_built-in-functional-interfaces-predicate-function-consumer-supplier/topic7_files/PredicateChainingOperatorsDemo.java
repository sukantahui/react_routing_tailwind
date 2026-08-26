/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 7: Predicate Chaining: and(), or(), negate(), and Predicate.isEqual()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Predicate;

class TaxAccount {
    final String panNumber;
    final double income;
    final boolean hasAuditNotice;

    public TaxAccount(String panNumber, double income, boolean hasAuditNotice) {
        this.panNumber = panNumber;
        this.income = income;
        this.hasAuditNotice = hasAuditNotice;
    }
}

public class PredicateChainingOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: Predicate CHAINING (and, or, negate, isEqual) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<TaxAccount> accounts = List.of(
                new TaxAccount("ABCDE1234F", 1200000.0, false),
                new TaxAccount("WXYZ9876K", 450000.0, true),
                new TaxAccount("PQRS5555L", 850000.0, true),
                new TaxAccount("SPECIAL999", 5000000.0, false)
        );

        // Core Micro-Predicates:
        Predicate<TaxAccount> isHighIncome = acc -> acc.income > 1000000.0;
        Predicate<TaxAccount> hasNotice = acc -> acc.hasAuditNotice;

        // 1. AND Composition: High Income AND Has Notice:
        Predicate<TaxAccount> highIncomeWithNotice = isHighIncome.and(hasNotice);

        // 2. OR Composition: High Income OR Has Notice:
        Predicate<TaxAccount> highRiskAccount = isHighIncome.or(hasNotice);

        // 3. NEGATE Composition (NOT): Clean Record (NOT having audit notice):
        Predicate<TaxAccount> isCleanRecord = hasNotice.negate();

        // 4. Predicate.isEqual() Static Factory:
        Predicate<String> isBarrackporePan = Predicate.isEqual("SPECIAL999");

        System.out.println(">>> 1. High Risk Accounts (High Income OR Notice):");
        accounts.stream().filter(highRiskAccount).forEach(a -> System.out.println("  [Risk] PAN: " + a.panNumber));

        System.out.println("\n>>> 2. Clean Record Accounts (Negate Notice):");
        accounts.stream().filter(isCleanRecord).forEach(a -> System.out.println("  [Clean] PAN: " + a.panNumber));

        System.out.println("\n>>> 3. Specific PAN match check: " + isBarrackporePan.test("SPECIAL999"));

        System.out.println("\n==========================================================================");
    }
}