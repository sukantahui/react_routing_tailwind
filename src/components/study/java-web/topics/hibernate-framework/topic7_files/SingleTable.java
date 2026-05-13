// SingleTable.java
import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Payment {
    @Id @GeneratedValue
    private Long id;
    private Double amount;
    private LocalDate date;
}

@Entity
@DiscriminatorValue("CC")
public class CreditCardPayment extends Payment {
    private String cardNumber;
    private String cardHolderName;
}

@Entity
@DiscriminatorValue("CH")
public class ChequePayment extends Payment {
    private String chequeNumber;
    private String bankName;
}