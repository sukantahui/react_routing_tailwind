// InterfaceUsageDemo.java
public class InterfaceUsageDemo {
    public static void main(String[] args) {
        // Polymorphic reference: interface type = implementing object
        SimpleInterface obj = new ImplementingClass();
        
        obj.performAction();
        System.out.println(obj.getStatus());
        
        // obj.reset(); // Not allowed – reference is of interface type
        // We need to cast if we want to call subclass-specific method
        if (obj instanceof ImplementingClass) {
            ((ImplementingClass) obj).reset();
        }
    }
}