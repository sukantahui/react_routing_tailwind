// VehicleWithDefault.java
public interface VehicleWithDefault {
    // abstract methods (still mandatory)
    void start();
    void stop();

    // default method (Java 8+)
    default void honk() {
        System.out.println("Beep beep! Default honk.");
    }

    // static method (Java 8+)
    static int getMaxSpeed() {
        return 180;
    }
}