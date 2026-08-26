/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 16: Real-World OOP Modeling: BankAccount, Employee, Product, Car Entities
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Enterprise Domain Modeling in Pure Java OOP
 * ----------------------------------------------------------------------------
 * 1. The Art of Real-World OOP Modeling:
 *    - Real-world domain entities are NOT mere data holders.
 *    - They are living autonomous software agents that encapsulate:
 *      * Identity     : Unique unchangeable identifier (e.g. Account Number, VIN, SKU, EmpId).
 *      * State        : Private mutable & immutable fields with guarded invariants.
 *      * Behaviors    : Rich business operations ("Tell, Don't Ask") enforcing business truth.
 *
 * 2. The 4 Canonical Entities Demonstrated in this Module:
 *    - Entity 1: BankAccount (Financial invariants, minimum balance, inter-account transfers).
 *    - Entity 2: Employee    (Salary computation, HRA/DA tax brackets, performance increments).
 *    - Entity 3: Product     (Inventory stock management, SKU validation, sales fulfillment).
 *    - Entity 4: AutomobileCar (Finite state machine: ignition, acceleration, braking, fuel).
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class RealWorldOopModelingEntitiesDemo {

    // ========================================================================
    // 1. DOMAIN ENTITY: BankAccount (Financial Invariant & Transfer Guard)
    // ========================================================================
    public static class BankAccount {
        private static final double MINIMUM_MAINTENANCE_BALANCE_INR = 1000.00;

        private final String accountNumber;
        private final String accountHolderName;
        private final String branchCampus;
        private double balanceInr;
        private final List<String> transactionHistory;

        public BankAccount(String accountNumber, String accountHolderName, String branchCampus, double initialDepositInr) {
            Objects.requireNonNull(accountNumber, "Account number cannot be null.");
            Objects.requireNonNull(accountHolderName, "Holder name cannot be null.");
            if (initialDepositInr < MINIMUM_MAINTENANCE_BALANCE_INR) {
                throw new IllegalArgumentException("Initial deposit must be at least minimum balance: ₹" + MINIMUM_MAINTENANCE_BALANCE_INR);
            }
            this.accountNumber = accountNumber;
            this.accountHolderName = accountHolderName.trim();
            this.branchCampus = branchCampus;
            this.balanceInr = initialDepositInr;
            this.transactionHistory = new ArrayList<>();
            recordTxn("Account opened with initial deposit: ₹" + String.format("%.2f", initialDepositInr));
        }

        public boolean deposit(double amountInr) {
            if (amountInr <= 0.0) {
                System.out.println("  [Bank Deposit REJECTED] Amount must be positive: ₹" + amountInr);
                return false;
            }
            this.balanceInr += amountInr;
            recordTxn("Deposit (+): ₹" + String.format("%.2f", amountInr));
            return true;
        }

        public boolean withdraw(double amountInr) {
            if (amountInr <= 0.0) return false;
            if (this.balanceInr - amountInr < MINIMUM_MAINTENANCE_BALANCE_INR) {
                System.out.printf("  [Bank Withdrawal REJECTED] Invariant Guard: Balance cannot fall below ₹%,.2f. Requested: ₹%,.2f | Available: ₹%,.2f\n",
                        MINIMUM_MAINTENANCE_BALANCE_INR, amountInr, this.balanceInr);
                return false;
            }
            this.balanceInr -= amountInr;
            recordTxn("Withdrawal (-): ₹" + String.format("%.2f", amountInr));
            return true;
        }

        // Inter-account transfer honoring atomicity
        public boolean transferTo(BankAccount targetAccount, double amountInr) {
            Objects.requireNonNull(targetAccount, "Target account cannot be null.");
            if (this == targetAccount) {
                System.out.println("  [Transfer REJECTED] Cannot transfer funds to the same account!");
                return false;
            }
            if (this.withdraw(amountInr)) {
                targetAccount.deposit(amountInr);
                recordTxn("Transfer Out (-): ₹" + String.format("%.2f", amountInr) + " to Acc " + targetAccount.getAccountNumber());
                targetAccount.recordTxn("Transfer In (+): ₹" + String.format("%.2f", amountInr) + " from Acc " + this.accountNumber);
                System.out.printf("  [Transfer SUCCESS] ₹%,.2f transferred from %s (Acc %s) to %s (Acc %s)\n",
                        amountInr, this.accountHolderName, this.accountNumber, targetAccount.getAccountHolderName(), targetAccount.getAccountNumber());
                return true;
            }
            return false;
        }

        private void recordTxn(String entry) {
            this.transactionHistory.add(entry);
        }

        public String getAccountNumber() { return accountNumber; }
        public String getAccountHolderName() { return accountHolderName; }
        public double getBalanceInr() { return balanceInr; }
        public List<String> getTransactionHistory() { return Collections.unmodifiableList(transactionHistory); }

        public void printSummary() {
            System.out.printf("  [BankAccount %s] Holder: %-15s | Branch: %-15s | Balance: ₹%,.2f\n",
                    accountNumber, accountHolderName, branchCampus, balanceInr);
        }
    }

    // ========================================================================
    // 2. DOMAIN ENTITY: Employee (Payroll & Performance Logic)
    // ========================================================================
    public static class Employee {
        private final int employeeId;
        private String employeeName;
        private String department;
        private double monthlyBasicSalaryInr;
        private double performanceRatingScore; // 1.0 to 5.0

        public Employee(int id, String name, String dept, double basicSalary) {
            if (id <= 0) throw new IllegalArgumentException("Invalid Employee ID.");
            this.employeeId = id;
            this.employeeName = Objects.requireNonNull(name, "Name required").trim();
            this.department = Objects.requireNonNull(dept, "Department required").trim();
            setMonthlyBasicSalaryInr(basicSalary);
            this.performanceRatingScore = 3.0; // Default average rating
        }

        public void setMonthlyBasicSalaryInr(double basicSalary) {
            if (basicSalary < 15000.00) {
                throw new IllegalArgumentException("Minimum wage threshold is ₹15,000.00. Supplied: ₹" + basicSalary);
            }
            this.monthlyBasicSalaryInr = basicSalary;
        }

        public void evaluatePerformance(double ratingScore) {
            if (ratingScore < 1.0 || ratingScore > 5.0) {
                throw new IllegalArgumentException("Rating score must be between 1.0 and 5.0.");
            }
            this.performanceRatingScore = ratingScore;
            // High performance triggers salary increment
            if (ratingScore >= 4.5) {
                double increment = this.monthlyBasicSalaryInr * 0.15; // 15% merit raise
                this.monthlyBasicSalaryInr += increment;
                System.out.printf("  [Merit Promotion] %s awarded 15%% raise! New Basic: ₹%,.2f\n", employeeName, monthlyBasicSalaryInr);
            }
        }

        // Computed Payroll Allowances
        public double calculateHraAllowance() { return monthlyBasicSalaryInr * 0.40; } // 40% HRA
        public double calculateDaAllowance() { return monthlyBasicSalaryInr * 0.20; }  // 20% DA
        public double calculateGrossMonthlySalary() {
            return monthlyBasicSalaryInr + calculateHraAllowance() + calculateDaAllowance();
        }
        public double calculateAnnualCostToCompany() {
            return (calculateGrossMonthlySalary() * 12.0) + (monthlyBasicSalaryInr * 1.5); // Bonus
        }

        public int getEmployeeId() { return employeeId; }
        public String getEmployeeName() { return employeeName; }
        public String getDepartment() { return department; }
        public double getMonthlyBasicSalaryInr() { return monthlyBasicSalaryInr; }
        public double getPerformanceRatingScore() { return performanceRatingScore; }

        public void printPayrollSlip() {
            System.out.printf("  [Employee EMP-%04d] %-15s | Dept: %-10s | Basic: ₹%,.2f | Gross: ₹%,.2f | CTC: ₹%,.2f (Rating: %.1f/5)\n",
                    employeeId, employeeName, department, monthlyBasicSalaryInr, calculateGrossMonthlySalary(), calculateAnnualCostToCompany(), performanceRatingScore);
        }
    }

    // ========================================================================
    // 3. DOMAIN ENTITY: Product (E-Commerce Inventory & Order Fulfillment)
    // ========================================================================
    public static class Product {
        private final String skuCode;
        private String productTitle;
        private String category;
        private double unitPriceInr;
        private int stockQuantityInStore;

        public Product(String sku, String title, String category, double price, int initialStock) {
            Objects.requireNonNull(sku, "SKU required");
            if (price < 0.0) throw new IllegalArgumentException("Price cannot be negative.");
            if (initialStock < 0) throw new IllegalArgumentException("Stock cannot be negative.");
            this.skuCode = sku;
            this.productTitle = title;
            this.category = category;
            this.unitPriceInr = price;
            this.stockQuantityInStore = initialStock;
        }

        public boolean fulfillCustomerOrder(int orderQuantity) {
            if (orderQuantity <= 0) return false;
            if (orderQuantity > stockQuantityInStore) {
                System.out.printf("  [Inventory SHORTAGE] SKU %s (%s): Requested %d units, but only %d in stock!\n",
                        skuCode, productTitle, orderQuantity, stockQuantityInStore);
                return false;
            }
            this.stockQuantityInStore -= orderQuantity;
            double orderValue = orderQuantity * this.unitPriceInr;
            System.out.printf("  [Order FULFILLED] %d x '%s' fulfilled | Total: ₹%,.2f | Remaining Stock: %d\n",
                    orderQuantity, productTitle, orderValue, stockQuantityInStore);
            return true;
        }

        public void restockInventory(int incomingUnits) {
            if (incomingUnits <= 0) throw new IllegalArgumentException("Restock units must be positive.");
            this.stockQuantityInStore += incomingUnits;
            System.out.printf("  [Restocked] SKU %s received %d units. New Stock: %d\n", skuCode, incomingUnits, stockQuantityInStore);
        }

        public String getSkuCode() { return skuCode; }
        public String getProductTitle() { return productTitle; }
        public double getUnitPriceInr() { return unitPriceInr; }
        public int getStockQuantityInStore() { return stockQuantityInStore; }

        public void printCatalogCard() {
            System.out.printf("  [Product SKU: %-10s] %-30s | Category: %-12s | Price: ₹%,.2f | Stock: %d\n",
                    skuCode, productTitle, category, unitPriceInr, stockQuantityInStore);
        }
    }

    // ========================================================================
    // 4. DOMAIN ENTITY: AutomobileCar (State Machine: Ignition, Speed, Fuel)
    // ========================================================================
    public static class AutomobileCar {
        private final String vehicleVinNumber;
        private final String brandAndModel;
        private boolean isEngineRunning = false;
        private int currentSpeedKmPerHour = 0;
        private double fuelTankCapacityLitres = 50.0;
        private double currentFuelLevelLitres;

        public AutomobileCar(String vin, String model, double initialFuelLitres) {
            this.vehicleVinNumber = Objects.requireNonNull(vin, "VIN required");
            this.brandAndModel = Objects.requireNonNull(model, "Model required");
            this.currentFuelLevelLitres = Math.min(initialFuelLitres, fuelTankCapacityLitres);
        }

        public boolean startEngine() {
            if (isEngineRunning) {
                System.out.println("  [Car Warning] Engine is already running!");
                return false;
            }
            if (currentFuelLevelLitres <= 0.5) {
                System.out.println("  [Engine START FAILED] Out of fuel! Please refuel.");
                return false;
            }
            this.isEngineRunning = true;
            System.out.printf("  [Engine STARTED] %s engine ignited. Ready to drive.\n", brandAndModel);
            return true;
        }

        public void accelerate(int kmPerHourDelta) {
            if (!isEngineRunning) {
                System.out.println("  [Acceleration BLOCKED] Cannot accelerate: Engine is OFF!");
                return;
            }
            if (currentFuelLevelLitres <= 0.0) {
                stopEngine();
                System.out.println("  [Engine STALLED] Out of fuel while driving!");
                return;
            }
            this.currentSpeedKmPerHour = Math.min(220, this.currentSpeedKmPerHour + kmPerHourDelta);
            this.currentFuelLevelLitres = Math.max(0.0, this.currentFuelLevelLitres - (kmPerHourDelta * 0.05));
            System.out.printf("  [Accelerating] Speed: %d km/h | Fuel: %.2f L remaining\n",
                    currentSpeedKmPerHour, currentFuelLevelLitres);
        }

        public void brake(int kmPerHourDelta) {
            this.currentSpeedKmPerHour = Math.max(0, this.currentSpeedKmPerHour - kmPerHourDelta);
            System.out.printf("  [Braking Applied] Speed slowed to: %d km/h\n", currentSpeedKmPerHour);
        }

        public void stopEngine() {
            this.isEngineRunning = false;
            this.currentSpeedKmPerHour = 0;
            System.out.printf("  [Engine STOPPED] %s engine turned off.\n", brandAndModel);
        }

        public void refuel(double litres) {
            if (litres <= 0) return;
            this.currentFuelLevelLitres = Math.min(fuelTankCapacityLitres, this.currentFuelLevelLitres + litres);
            System.out.printf("  [Refueled] Added %.1f L. Tank Level: %.1f / %.1f L\n",
                    litres, currentFuelLevelLitres, fuelTankCapacityLitres);
        }

        public void printDashboard() {
            System.out.printf("  [Car VIN: %s] %-20s | Engine: %-3s | Speed: %3d km/h | Fuel: %4.1f L\n",
                    vehicleVinNumber, brandAndModel, (isEngineRunning ? "ON" : "OFF"), currentSpeedKmPerHour, currentFuelLevelLitres);
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Real-World OOP Modeling Demonstrations
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: REAL-WORLD DOMAIN MODELING (BankAccount, Employee, Product, Car)");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // 1. BANK ACCOUNT DEMONSTRATION
        // --------------------------------------------------------------------
        System.out.println(">>> 1. REAL-WORLD MODELING: BankAccount Entity (Inter-Account Transfers)");
        BankAccount swadeepAcc = new BankAccount("SB-WB-1001", "Swadeep Paul", "Barrackpore Hub", 15000.00);
        BankAccount tuhinaAcc  = new BankAccount("SB-WB-1002", "Tuhina Das", "Naihati Hub", 8000.00);

        swadeepAcc.printSummary();
        tuhinaAcc.printSummary();

        System.out.println("\nExecuting Inter-Account Transfer (Swadeep -> Tuhina: ₹5,000):");
        swadeepAcc.transferTo(tuhinaAcc, 5000.00);

        System.out.println("\nAttempting Illegal Overdraw (Breaching ₹1,000 Minimum Balance Invariant):");
        swadeepAcc.withdraw(12000.00);

        swadeepAcc.printSummary();
        tuhinaAcc.printSummary();

        // --------------------------------------------------------------------
        // 2. EMPLOYEE PAYROLL & PERFORMANCE DEMONSTRATION
        // --------------------------------------------------------------------
        System.out.println("\n>>> 2. REAL-WORLD MODELING: Employee Entity (Payroll & Performance Raises)");
        Employee abhronila = new Employee(501, "Abhronila Ray", "Engineering", 65000.00);
        Employee debangshu = new Employee(502, "Debangshu Sen", "Cloud Architecture", 80000.00);

        abhronila.printPayrollSlip();
        debangshu.printPayrollSlip();

        System.out.println("\nAnnual Appraisal Cycle: Evaluating Abhronila (Rating 4.8/5.0):");
        abhronila.evaluatePerformance(4.8); // Triggers merit promotion
        abhronila.printPayrollSlip();

        // --------------------------------------------------------------------
        // 3. PRODUCT INVENTORY & ORDER FULFILLMENT DEMONSTRATION
        // --------------------------------------------------------------------
        System.out.println("\n>>> 3. REAL-WORLD MODELING: Product Entity (Inventory & Order Fulfillment)");
        Product javaBook = new Product("SKU-JAVA-01", "Mastering Java 21 Enterprise", "Books", 850.00, 15);
        javaBook.printCatalogCard();

        System.out.println("\nProcessing customer orders:");
        javaBook.fulfillCustomerOrder(5);  // Successful sale
        javaBook.fulfillCustomerOrder(12); // Shortage rejection!
        javaBook.restockInventory(20);     // Warehouse restock
        javaBook.fulfillCustomerOrder(12); // Successful after restock
        javaBook.printCatalogCard();

        // --------------------------------------------------------------------
        // 4. AUTOMOBILE CAR STATE MACHINE DEMONSTRATION
        // --------------------------------------------------------------------
        System.out.println("\n>>> 4. REAL-WORLD MODELING: AutomobileCar Entity (Finite State Machine)");
        AutomobileCar mySedan = new AutomobileCar("VIN-WB-88992211", "Tata Harrier EV", 25.0);
        mySedan.printDashboard();

        System.out.println("\nAttempting acceleration while engine is OFF:");
        mySedan.accelerate(40); // Blocked

        System.out.println("\nStarting engine and accelerating on Kalyani Expressway:");
        mySedan.startEngine();
        mySedan.accelerate(60);
        mySedan.accelerate(40);
        mySedan.brake(30);
        mySedan.stopEngine();
        mySedan.printDashboard();

        System.out.println("\n==========================================================================");
        System.out.println(" REAL-WORLD OOP MODELING DEMONSTRATION COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
