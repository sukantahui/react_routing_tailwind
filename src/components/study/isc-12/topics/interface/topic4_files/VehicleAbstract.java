// VehicleAbstract.java
public abstract class VehicleAbstract {
    protected String brand;
    protected int fuelLevel;

    // constructor (interfaces cannot have this)
    public VehicleAbstract(String brand) {
        this.brand = brand;
        this.fuelLevel = 0;
    }

    // abstract method
    public abstract void start();

    // concrete method
    public void refuel(int amount) {
        fuelLevel += amount;
        System.out.println(brand + " refueled. Fuel level: " + fuelLevel);
    }

    // non-abstract method
    public int getFuelLevel() {
        return fuelLevel;
    }
}