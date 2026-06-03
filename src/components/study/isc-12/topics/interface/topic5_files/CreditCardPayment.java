// CreditCardPayment.java
public class CreditCardPayment implements Payment {
    private String cardNumber;
    private String cardHolderName;

    public CreditCardPayment(String cardNumber, String cardHolderName) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    @Override
    public boolean processPayment(double amount) {
        // Simulate credit card processing
        System.out.println("Processing credit card payment of $" + amount);
        System.out.println("Card: " + cardNumber.substring(0, 4) + "******");
        return true;
    }

    @Override
    public String getPaymentDetails() {
        return "Credit Card: " + cardHolderName;
    }
}
