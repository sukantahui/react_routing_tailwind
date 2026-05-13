// PolymorphicQueries.java
import org.hibernate.Session;
import java.util.List;

public class PolymorphicQueries {
    public void demo(Session session) {
        // Returns all Payment subclasses: CreditCardPayment, ChequePayment, CashPayment
        List<Payment> allPayments = session.createQuery("FROM Payment", Payment.class).list();
        
        // Restrict to specific subtype
        List<CreditCardPayment> creditPayments = session.createQuery("FROM CreditCardPayment", CreditCardPayment.class).list();
        
        // Using TYPE operator
        List<Payment> onlyCreditAndCheque = session.createQuery(
            "FROM Payment p WHERE TYPE(p) IN (CreditCardPayment, ChequePayment)", Payment.class).list();
        
        // Downcasting in HQL
        List<String> cardNumbers = session.createQuery(
            "SELECT p.cardNumber FROM CreditCardPayment p", String.class).list();
    }
}