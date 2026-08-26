/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 10: The Decorator Pattern - Dynamic Behavior Attachment
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class DecoratorPatternDemo {

    // 1. Component Interface:
    public interface TextData {
        String getContent();
    }

    // 2. Concrete Base Component:
    public static class PlainText implements TextData {
        private final String text;
        public PlainText(String text) { this.text = text; }
        @Override public String getContent() { return text; }
    }

    // 3. Base Decorator:
    public static abstract class TextDecorator implements TextData {
        protected final TextData wrapped;
        public TextDecorator(TextData wrapped) { this.wrapped = wrapped; }
    }

    // Concrete Decorator 1: UpperCase
    public static class UpperCaseDecorator extends TextDecorator {
        public UpperCaseDecorator(TextData wrapped) { super(wrapped); }
        @Override
        public String getContent() {
            return wrapped.getContent().toUpperCase();
        }
    }

    // Concrete Decorator 2: HTML Bold Tag
    public static class BoldDecorator extends TextDecorator {
        public BoldDecorator(TextData wrapped) { super(wrapped); }
        @Override
        public String getContent() {
            return "<b>" + wrapped.getContent() + "</b>";
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: DECORATOR DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // Stacking decorators dynamically:
        TextData raw = new PlainText("Welcome to Coder & AccoTax Barrackpore");
        TextData upper = new UpperCaseDecorator(raw);
        TextData boldAndUpper = new BoldDecorator(upper);

        System.out.println("Raw Text       : " + raw.getContent());
        System.out.println("Upper Text     : " + upper.getContent());
        System.out.println("Decorated Final: " + boldAndUpper.getContent());

        System.out.println("\n==========================================================================");
    }
}
