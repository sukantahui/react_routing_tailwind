// CascadeExample.java - Different cascade types
import javax.persistence.*;

@Entity
public class Parent {
    @Id @GeneratedValue
    private Long id;
    
    // PERSIST → save child automatically when parent saved
    @OneToMany(mappedBy = "parent", cascade = CascadeType.PERSIST)
    private List<Child> children;
    
    // REMOVE → delete child when parent deleted
    @OneToMany(mappedBy = "parent", cascade = CascadeType.REMOVE)
    private List<Child> removableChildren;
    
    // ALL → all operations cascade
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Child> allCascadeChildren;
    
    // DETACH, MERGE, REFRESH also available
}