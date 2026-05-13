// TemporalExample.java
import javax.persistence.*;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class DateEntity {
    @Id @GeneratedValue
    private Long id;
    
    // Legacy Date with @Temporal
    @Temporal(TemporalType.DATE)      // SQL DATE
    private Date birthDate;
    
    @Temporal(TemporalType.TIME)      // SQL TIME
    private Date alarmTime;
    
    @Temporal(TemporalType.TIMESTAMP) // SQL TIMESTAMP
    private Date createdAt;
    
    // Java 8 Time API – no @Temporal needed
    private LocalDate joinDate;        // maps to DATE
    private LocalDateTime lastLogin;   // maps to TIMESTAMP
    // getters/setters...
}