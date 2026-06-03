// CarAbstractImpl.java
public class CarAbstractImpl extends VehicleAbstract {
    private String model;

    public CarAbstractImpl(String brand, String model) {
        super(brand); // call abstract class constructor
        this.model = model;
    }

    @Override
    public void start() {
        System.out.println(model + " car started. Brand: " + brand);
    }

    // can add extra methods
    public void honk() {
        System.out.println("Beep beep!");
    }
}