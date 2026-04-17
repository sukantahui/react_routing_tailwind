// VehicleInterface.java
public interface VehicleInterface {
    // all fields are public static final
    int MAX_SPEED = 180;

    // abstract method (implicitly public abstract)
    void start();

    // default method (Java 8+)
    default void refuel(int amount) {
        System.out.println("Refueling by " + amount + " units.");
    }

    // static method (Java 8+)
    static void printMaxSpeed() {
        System.out.println("Max speed: " + MAX_SPEED);
    }
}