// Multi-level Inheritance with Different Access Modifiers
class GrandParent {
    public String publicInfo = "Everyone can see this";
    protected String protectedInfo = "Family can see this";
    private String privateInfo = "Only grandparent knows this";
    String defaultInfo = "Package level access";
    
    public void showAccessModifiers() {
        System.out.println("Inside GrandParent:");
        System.out.println("  - Can access privateInfo: " + privateInfo);
        System.out.println("  - Can access protectedInfo: " + protectedInfo);
        System.out.println("  - Can access publicInfo: " + publicInfo);
        System.out.println("  - Can access defaultInfo: " + defaultInfo);
    }
    
    protected void familyTradition() {
        System.out.println("Family tradition passed down generations!");
    }
}

class Parent extends GrandParent {
    String familyName = "Chatterjee";
    String location = "Ichapur";
    
    public void showWhatInherited() {
        System.out.println("\nInside Parent (from Ichapur):");
        System.out.println("  - Can access publicInfo: " + publicInfo);
        System.out.println("  - Can access protectedInfo: " + protectedInfo);
        // System.out.println(privateInfo); // ERROR! Cannot access private member
        System.out.println("  - Can access defaultInfo: " + defaultInfo);
        System.out.println("  - Family Name: " + familyName);
    }
    
    public void modifyFamilyInfo() {
        protectedInfo = "Modified by Parent from " + location;
        System.out.println("Parent modified protectedInfo: " + protectedInfo);
    }
}

class Child extends Parent {
    String schoolName = "Naihati High School";
    int standard = 8;
    
    public void showAllAccess() {
        System.out.println("\nInside Child (studying at " + schoolName + "):");
        System.out.println("  - Can access publicInfo: " + publicInfo);
        System.out.println("  - Can access protectedInfo: " + protectedInfo);
        System.out.println("  - Can access defaultInfo: " + defaultInfo);
        System.out.println("  - Family Name: " + familyName);
        System.out.println("  - Location: " + location);
        System.out.println("  - Standard: " + standard);
    }
    
    public void practiceTradition() {
        familyTradition(); // Can call protected method from GrandParent
        System.out.println("Child " + familyName + " continues the tradition in " + location);
    }
}

public class InheritanceExample3 {
    public static void main(String[] args) {
        System.out.println("=== Multi-level Inheritance Demo ===\n");
        
        // Creating objects at different levels
        GrandParent gp = new GrandParent();
        Parent parent = new Parent();
        Child child = new Child();
        
        // Demonstrate inheritance chain
        System.out.println("--- GrandParent Level ---");
        gp.showAccessModifiers();
        
        System.out.println("\n--- Parent Level (extends GrandParent) ---");
        parent.showWhatInherited();
        parent.modifyFamilyInfo();
        
        System.out.println("\n--- Child Level (extends Parent) ---");
        child.showAllAccess();
        child.practiceTradition();
        
        // Demonstrate protected member modification across chain
        System.out.println("\n--- Protected Member Across Chain ---");
        System.out.println("Original protectedInfo in GrandParent: " + gp.protectedInfo);
        System.out.println("After Parent modification: " + parent.protectedInfo);
        System.out.println("Child sees modified value: " + child.protectedInfo);
        
        // Demonstrating inheritance of methods
        System.out.println("\n--- Method Inheritance ---");
        child.familyTradition(); // Inherited from GrandParent
        child.modifyFamilyInfo(); // Inherited from Parent
    }
}

/* OUTPUT HIGHLIGHTS:
- Demonstrates what members are inherited (public, protected, default)
- Shows that private members are NOT inherited
- Multi-level inheritance: Child → Parent → GrandParent
- Protected members accessible throughout inheritance chain
- Shows real locations: Ichapur, Naihati
*/