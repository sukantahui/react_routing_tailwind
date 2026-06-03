// OneToOne.java
import javax.persistence.*;

// Owner side (has foreign key)
@Entity
public class Person {
    @Id @GeneratedValue
    private Long id;
    private String name;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "passport_id", unique = true)
    private Passport passport;
    // getters/setters
}

// Inverse side (mappedBy)
@Entity
public class Passport {
    @Id @GeneratedValue
    private Long id;
    private String number;
    
    @OneToOne(mappedBy = "passport")  // no foreign key
    private Person person;
    // getters/setters
}

// Alternative: shared primary key (using @MapsId)
@Entity
public class Employee {
    @Id
    private Long id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private EmployeeDetails details;
}