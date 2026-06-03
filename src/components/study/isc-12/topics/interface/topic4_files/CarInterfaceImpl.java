// CarInterfaceImpl.java
public class CarInterfaceImpl implements VehicleInterface {
    private String brand;
    private String model;

    public CarInterfaceImpl(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }

    @Override
    public void start() {
        System.out.println(model + " car started. Brand: " + brand);
    }

    // can override default method
    @Override
    public void refuel(int amount) {
        System.out.println("Car refueled with " + amount + " liters.");
    }

    public void honk() {
        System.out.println("Beep beep!");
    }
}