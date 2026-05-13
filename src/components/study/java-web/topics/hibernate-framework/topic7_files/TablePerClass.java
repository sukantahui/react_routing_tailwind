// TablePerClass.java
import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Payment {
    @Id @GeneratedValue  // WARNING: IDENTITY won't work across tables
    protected Long id;
    protected Double amount;
}

@Entity
public class CreditCardPayment extends Payment {
    private String cardNumber;
}