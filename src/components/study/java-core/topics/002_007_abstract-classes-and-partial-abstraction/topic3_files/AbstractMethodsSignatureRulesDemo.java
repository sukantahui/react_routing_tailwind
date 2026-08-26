/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 3: Abstract Methods: Method Signature Without Body
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractMethodsSignatureRulesDemo {

    public abstract static class SalaryPayrollProcessor {

        // ABSTRACT METHOD:
        // 1. Declared with 'abstract' keyword
        // 2. Has NO curly braces '{ ... }'
        // 3. Terminated strictly by a semicolon ';'
        public abstract double computeNetPay(double grossSalary, double taxRate);

        // Abstract method with multiple parameters
        public abstract void generatePaySlip(String employeeName, double netAmount);
    }

    public static class FullTimeStaffPayroll extends SalaryPayrollProcessor {
        @Override
        public double computeNetPay(double grossSalary, double taxRate) {
            double taxDeduction = grossSalary * (taxRate / 100.0);
            return grossSalary - taxDeduction + 2500.0; // Adding full-time allowance
        }

        @Override
        public void generatePaySlip(String employeeName, double netAmount) {
            System.out.printf("  [PAYSLIP] Employee: %s | Net Disbursed: ₹%.2f\n", employeeName, netAmount);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: ABSTRACT METHOD SIGNATURE RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SalaryPayrollProcessor processor = new FullTimeStaffPayroll();
        double net = processor.computeNetPay(60000.0, 10.0);
        processor.generatePaySlip("Swadeep Paul", net);

        System.out.println("\n==========================================================================");
    }
}