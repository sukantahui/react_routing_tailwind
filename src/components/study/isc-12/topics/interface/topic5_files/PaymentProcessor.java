// PaymentProcessor.java
import java.util.List;

public class PaymentProcessor {
    // Process a single payment
    public static void processPayment(Payment payment, double amount) {
        if (payment.processPayment(amount)) {
            System.out.println("Payment successful via " + payment.getPaymentDetails());
        } else {
            System.out.println("Payment failed.");
        }
    }

    // Process multiple payments (polymorphism in action)
    public static void processPayments(List<Payment> payments, double amount) {
        for (Payment payment : payments) {
            processPayment(payment, amount);
        }
    }

    public static void main(String[] args) {
        Payment cc = new CreditCardPayment("1234-5678-9012-3456", "Swadeep");
        Payment pp = new PayPalPayment("tuhina@example.com");

        processPayment(cc, 99.99);
        processPayment(pp, 49.50);
    }
}