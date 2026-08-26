/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 5: Abstract Factory Pattern - Product Families
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class AbstractFactoryPatternDemo {

    // 1. Abstract Products:
    public interface Button { void render(); }
    public interface Checkbox { void render(); }

    // Concrete Products - Windows Family:
    public static class WindowsButton implements Button {
        @Override public void render() { System.out.println("   [WIN UI]: Rendering Windows Fluent Button."); }
    }
    public static class WindowsCheckbox implements Checkbox {
        @Override public void render() { System.out.println("   [WIN UI]: Rendering Windows Checkbox."); }
    }

    // Concrete Products - Mac Family:
    public static class MacButton implements Button {
        @Override public void render() { System.out.println("   [MAC UI]: Rendering macOS Aqua Button."); }
    }
    public static class MacCheckbox implements Checkbox {
        @Override public void render() { System.out.println("   [MAC UI]: Rendering macOS Checkbox."); }
    }

    // 2. Abstract Factory Interface:
    public interface GUIFactory {
        Button createButton();
        Checkbox createCheckbox();
    }

    // Concrete Factories:
    public static class WindowsFactory implements GUIFactory {
        @Override public Button createButton() { return new WindowsButton(); }
        @Override public Checkbox createCheckbox() { return new WindowsCheckbox(); }
    }

    public static class MacFactory implements GUIFactory {
        @Override public Button createButton() { return new MacButton(); }
        @Override public Checkbox createCheckbox() { return new MacCheckbox(); }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ABSTRACT FACTORY PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        GUIFactory factory = new WindowsFactory();
        Button btn = factory.createButton();
        Checkbox chk = factory.createCheckbox();

        btn.render();
        chk.render();

        System.out.println("\n==========================================================================");
    }
}
