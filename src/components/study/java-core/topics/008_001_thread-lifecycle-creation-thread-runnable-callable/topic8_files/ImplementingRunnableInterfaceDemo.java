/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 8: Thread Creation Method 2: Implementing java.lang.Runnable Interface (Preferred)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

// 1. DOMAIN CLASS EXTENDS BASE ENTITY AND IMPLEMENTS RUNNABLE:
class BaseAccountingEntity {
    protected String companyId = "ACCO-TAX-2026";
}

class InvoiceAuditTask extends BaseAccountingEntity implements Runnable {

    private final String branch;

    public InvoiceAuditTask(String branch) {
        this.branch = branch;
    }

    // Implementing single abstract method of @FunctionalInterface Runnable:
    @Override
    public void run() {
        System.out.printf("[%s] Auditing invoices for %s (Entity Org: %s)...%n",
                Thread.currentThread().getName(), branch, companyId);
    }
}

public class ImplementingRunnableInterfaceDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CREATION METHOD 2: IMPLEMENTING Runnable - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Instantiate the Task (Workload):
        InvoiceAuditTask auditTask = new InvoiceAuditTask("Barrackpore Central");

        // 2. Pass Task to Thread Constructor (Execution Engine):
        Thread workerThread1 = new Thread(auditTask, "Auditor-Thread-1");
        Thread workerThread2 = new Thread(auditTask, "Auditor-Thread-2"); // Multiple threads sharing 1 task!

        workerThread1.start();
        workerThread2.start();

        workerThread1.join();
        workerThread2.join();

        System.out.println("\n>>> WHY IMPLEMENTING Runnable IS HIGHLY PREFERRED:");
        System.out.println("  1. Preserves Inheritance : The class can freely extend any base business class ('extends BaseAccountingEntity').");
        System.out.println("  2. Clean Decoupling      : Separates the WHAT (Runnable task) from the HOW (Thread execution engine).");
        System.out.println("  3. Thread Pool Ready     : Runnable instances can be directly submitted to ExecutorService / ThreadPoolExecutor!");

        System.out.println("\n==========================================================================");
    }
}