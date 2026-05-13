// AccessStrategy.java
import javax.persistence.*;

// Field access (default because @Id is on field)
@Entity
public class FieldAccessEntity {
    @Id
    private Long id;
    private String name;
    // getters/setters but Hibernate accesses fields directly
}

// Property access (explicit with @Access)
@Entity
@Access(AccessType.PROPERTY)  // force property access for whole class
public class PropertyAccessEntity {
    private Long id;
    private String name;
    
    @Id
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    // Hibernate uses getters/setters
}

// Mixed access: override for specific field
@Entity
public class MixedAccessEntity {
    private Long id;
    private String name;
    
    @Id
    @Access(AccessType.PROPERTY)  // only id uses property access
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    @Access(AccessType.FIELD)     // name uses field access
    private String name;
}