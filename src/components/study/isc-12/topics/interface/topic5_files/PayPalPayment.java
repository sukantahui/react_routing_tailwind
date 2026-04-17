// PayPalPayment.java
public class PayPalPayment implements Payment {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing PayPal payment of $" + amount);
        System.out.println("Account: " + email);
        return true;
    }

    @Override
    public String getPaymentDetails() {
        return "PayPal: " + email;
    }
}