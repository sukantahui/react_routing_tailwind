// RemoteControlAbstraction.java
// Demonstrates abstraction: hiding internal circuit details behind simple buttons

// Abstract class representing a generic remote control
abstract class RemoteControl {
    // Abstract methods (what the remote can do, but no how)
    public abstract void turnOn();
    public abstract void turnOff();
    public abstract void setChannel(int channel);
    
    // Concrete method (shared implementation)
    public void printBrand(String brand) {
        System.out.println("Remote brand: " + brand);
    }
}

// Concrete implementation for a TV remote
class TVRemote extends RemoteControl {
    private boolean isOn = false;
    private int currentChannel = 1;
    
    @Override
    public void turnOn() {
        // Complex internal wiring hidden from user
        isOn = true;
        System.out.println("TV powered ON. Signal sent to infrared LED.");
    }
    
    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("TV powered OFF. Standby circuit engaged.");
    }
    
    @Override
    public void setChannel(int channel) {
        if (isOn && channel >= 1 && channel <= 100) {
            currentChannel = channel;
            System.out.println("Channel set to " + channel + " (tuner frequency adjusted)");
        } else {
            System.out.println("Cannot change channel: TV is " + (isOn ? "off or invalid channel" : "off"));
        }
    }
    
    // Hidden internal method (not part of abstraction)
    private void validatePin(int pin) {
        System.out.println("PIN validated internally");
    }
}

// Client code - user only sees the abstracted interface
public class RemoteControlAbstraction {
    public static void main(String[] args) {
        RemoteControl myRemote = new TVRemote();  // Abstraction in action
        myRemote.turnOn();        // User doesn't know about infrared signals
        myRemote.setChannel(42);
        myRemote.turnOff();
        // myRemote.validatePin(1234); // ERROR: private method - abstraction hides it
    }
}