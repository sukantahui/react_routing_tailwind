// Car.java
public class Car implements VehicleInterface {
    private double fuelLevel = 100.0;

    @Override
    public void startEngine() {
        System.out.println("Car engine started. Vroom!");
    }

    @Override
    public void stopEngine() {
        System.out.println("Car engine stopped.");
    }

    @Override
    public double getFuelLevel() {
        return fuelLevel;
    }

    // additional method specific to Car
    public void honk() {
        System.out.println("Beep beep!");
    }
}