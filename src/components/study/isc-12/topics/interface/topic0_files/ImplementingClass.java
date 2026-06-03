// ImplementingClass.java
public class ImplementingClass implements SimpleInterface {
    // must implement all abstract methods
    @Override
    public void performAction() {
        System.out.println("Action performed. Max allowed: " + MAX_VALUE);
    }

    @Override
    public String getStatus() {
        return "Status: OK";
    }

    // can add extra methods
    public void reset() {
        System.out.println("Resetting...");
    }
}