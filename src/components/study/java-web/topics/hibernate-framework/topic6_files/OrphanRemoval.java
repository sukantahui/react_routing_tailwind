// OrphanRemoval.java - When a child is removed from collection, it's deleted
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ParentWithOrphan {
    @Id @GeneratedValue
    private Long id;
    
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children = new ArrayList<>();
    
    public void removeChild(Child child) {
        children.remove(child);
        child.setParent(null);  // orphanRemoval will delete the child from DB
    }
}