// CarDefaultImpl.java
public class CarDefaultImpl implements VehicleWithDefault {
    private boolean isRunning = false;

    @Override
    public void start() {
        isRunning = true;
        System.out.println("Car started.");
    }

    @Override
    public void stop() {
        isRunning = false;
        System.out.println("Car stopped.");
    }

    // Optionally override the default method
    @Override
    public void honk() {
        System.out.println("Car honk: LOUD HORN!");
    }
}