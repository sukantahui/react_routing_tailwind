// IdGeneration.java
import javax.persistence.*;

@Entity
public class IdExample {
    // Strategy 1: IDENTITY (auto-increment)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long identityId;
    
    // Strategy 2: SEQUENCE (with custom generator)
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq")
    @SequenceGenerator(name = "my_seq", sequenceName = "student_seq", allocationSize = 50)
    private Long sequenceId;
    
    // Strategy 3: TABLE (portable but slower)
    @Id @GeneratedValue(strategy = GenerationType.TABLE, generator = "table_gen")
    @TableGenerator(name = "table_gen", table = "id_gen", pkColumnValue = "student")
    private Long tableId;
    
    // Strategy 4: AUTO (Hibernate chooses based on dialect)
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long autoId;
    
    // Strategy 5: UUID
    @Id @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String uuidId;
    
    // Strategy 6: ASSIGNED (no generation)
    @Id
    private String email;
}