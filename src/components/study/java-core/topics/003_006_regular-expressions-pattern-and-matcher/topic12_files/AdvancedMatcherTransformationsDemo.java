/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 12: Advanced Matcher Transformations: appendReplacement(), appendTail(), replaceAll(Function)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AdvancedMatcherTransformationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: ADVANCED MATCHER TRANSFORMATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String invoiceText = "Item A costs 500 INR, Item B costs 1200 INR, Item C costs 850 INR.";

        // Dynamic replacement using Matcher.replaceAll(Function) (Java 9+):
        // Converting all INR amounts with an 18% GST addition:
        Pattern amountPattern = Pattern.compile("(\\d+)\\s+INR");
        Matcher matcher = amountPattern.matcher(invoiceText);

        String updatedInvoice = matcher.replaceAll(matchResult -> {
            int originalPrice = Integer.parseInt(matchResult.group(1));
            int priceWithGst = (int) (originalPrice * 1.18);
            return priceWithGst + " INR (Incl. 18% GST)";
        });

        System.out.println(">>> 1. Original Invoice Statement:");
        System.out.println("  " + invoiceText);

        System.out.println("\n>>> 2. Dynamically Computed GST Invoice (via Java 9 replaceAll Function):");
        System.out.println("  " + updatedInvoice);

        System.out.println("\n==========================================================================");
    }
}