// AbstractVsConcrete.java
// Comprehensive comparison with real-world example

// ===== ABSTRACT CLASS =====
// Represents a generic payment method
abstract class Payment {
    protected double amount;
    protected String transactionId;
    
    public Payment(double amount) {
        this.amount = amount;
        this.transactionId = generateTransactionId();
    }
    
    // Concrete method - shared by all payments
    public void printReceipt() {
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Amount: $" + amount);
        System.out.println("Payment Type: " + getPaymentType());
        System.out.println("Status: " + processPayment());
    }
    
    // Concrete helper method
    private String generateTransactionId() {
        return "TXN" + System.currentTimeMillis();
    }
    
    // Abstract methods - each payment type implements differently
    public abstract String processPayment();
    public abstract String getPaymentType();
}

// Concrete subclass 1
class CreditCardPayment extends Payment {
    private String cardNumber;
    
    public CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = maskCardNumber(cardNumber);
    }
    
    @Override
    public String processPayment() {
        // Credit card specific logic
        return "SUCCESS: Credit card charged $" + amount;
    }
    
    @Override
    public String getPaymentType() {
        return "CREDIT_CARD";
    }
    
    private String maskCardNumber(String number) {
        return "****-****-****-" + number.substring(number.length() - 4);
    }
}

// Concrete subclass 2
class PayPalPayment extends Payment {
    private String email;
    
    public PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }
    
    @Override
    public String processPayment() {
        // PayPal specific API call
        return "SUCCESS: PayPal payment from " + email;
    }
    
    @Override
    public String getPaymentType() {
        return "PAYPAL";
    }
}

// ===== CONCRETE CLASS =====
// Complete, ready-to-use class (not meant to be extended)
final class UtilityHelper {
    private UtilityHelper() {} // Prevent instantiation
    
    public static double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
    
    public static String formatCurrency(double amount) {
        return "$" + String.format("%.2f", amount);
    }
}

// Another concrete class - can be instantiated and extended
class Customer {
    private String name;
    private String email;
    
    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    public void makePayment(Payment payment) {
        System.out.println(name + " making payment of " + UtilityHelper.formatCurrency(payment.amount));
        payment.printReceipt();
    }
    
    // Getters and setters (concrete)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

public class AbstractVsConcrete {
    public static void main(String[] args) {
        System.out.println("=== ABSTRACT CLASS IN ACTION ===\n");
        
        // Cannot do: Payment p = new Payment(100); // ERROR
        
        Payment ccPayment = new CreditCardPayment(299.99, "1234567890123456");
        Payment ppPayment = new PayPalPayment(49.99, "swadeep@example.com");
        
        ccPayment.printReceipt();
        System.out.println();
        ppPayment.printReceipt();
        
        System.out.println("\n=== CONCRETE CLASS IN ACTION ===\n");
        
        Customer customer = new Customer("Abhronila", "abhronila@example.com");
        customer.makePayment(ccPayment);
        
        System.out.println("\n=== UTILITY CONCRETE CLASS ===");
        System.out.println("Formatted: " + UtilityHelper.formatCurrency(123.456));
        System.out.println("Rounded: " + UtilityHelper.roundToTwoDecimals(123.456));
        
        // UtilityHelper helper = new UtilityHelper(); // ERROR: private constructor
    }
}