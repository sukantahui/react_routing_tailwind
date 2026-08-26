/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 5: java.util.function.Supplier<T>: T get() Factory Supplier & Lazy Evaluation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.Optional;
import java.util.function.Supplier;

public class SupplierLazyEvaluationDeepDiveDemo {

    public static String computeHeavyAuditReport() {
        System.out.println("  [HEAVY DB COMPUTATION] Generating 500-page Barrackpore Tax Audit Report (takes 3s)...");
        return "COMPREHENSIVE_TAX_AUDIT_REPORT_2026";
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: Supplier<T> & LAZY EVALUATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Supplier declaration (DOES NOT RUN THE CODE YET! Lazy Blueprint):
        Supplier<String> lazyReportSupplier = () -> computeHeavyAuditReport();

        System.out.println(">>> 1. Supplier instantiated. Notice NO heavy computation has executed yet!");

        // 2. Using Supplier with Optional.orElseGet() (LAZY EVALUATION):
        Optional<String> cachedReport = Optional.of("CACHED_REPORT_QUICK_HIT");

        // orElseGet(supplier) executes the supplier ONLY IF the Optional is empty:
        String report1 = cachedReport.orElseGet(lazyReportSupplier);
        System.out.println(">>> 2. Retrieved Report 1 (Cache hit): " + report1);

        Optional<String> emptyCache = Optional.empty();
        // Since emptyCache is empty, orElseGet EXECUTES the supplier now:
        System.out.println("\n>>> 3. Requesting Report 2 from empty cache (Triggers Supplier Execution):");
        String report2 = emptyCache.orElseGet(lazyReportSupplier);
        System.out.println(">>> Retrieved Report 2: " + report2);

        System.out.println("\n==========================================================================");
    }
}