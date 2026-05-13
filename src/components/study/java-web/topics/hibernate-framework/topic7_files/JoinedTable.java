// JoinedTable.java
import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Payment {
    @Id @GeneratedValue
    private Long id;
    private Double amount;
}

@Entity
@PrimaryKeyJoinColumn(name = "payment_id")
public class CreditCardPayment extends Payment {
    private String cardNumber;
}

@Entity
@PrimaryKeyJoinColumn(name = "payment_id")
public class CashPayment extends Payment {
    // no extra fields
}