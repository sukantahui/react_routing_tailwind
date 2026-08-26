/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 6: Inspecting & Modifying Fields Dynamically via field.get() and field.set()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

public class InspectingModifyingFieldsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: DYNAMIC FIELD INSPECTION & MUTATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentEntity student = new StudentEntity(101, "Swadeep Paul", 85.0);
        Class<?> clazz = student.getClass();

        System.out.println(">>> 1. Inspecting All Declared Fields on StudentEntity:");
        for (Field f : clazz.getDeclaredFields()) {
            System.out.println("   - Field: " + f.getName() + " [Type: " + f.getType().getSimpleName() + ", Modifiers: " + Modifier.toString(f.getModifiers()) + "]");
        }

        // 2. Reading Field Value dynamically: field.get(instance)
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true); // Enable access to private field
        Object currentValue = nameField.get(student);
        System.out.println("\n2. Read private field 'name' via field.get(): " + currentValue);

        // 3. Mutating Field Value dynamically: field.set(instance, newValue)
        Field scoreField = clazz.getDeclaredField("score");
        scoreField.setAccessible(true);
        scoreField.set(student, 96.5); // Mutated dynamically!

        System.out.println("3. Mutated private field 'score' to 96.5 via field.set(). New Entity State:");
        System.out.println("   " + student);

        System.out.println("\n==========================================================================");
    }

    public static class StudentEntity {
        private final int id;
        private String name;
        private double score;

        public StudentEntity(int id, String name, double score) {
            this.id = id;
            this.name = name;
            this.score = score;
        }

        @Override
        public String toString() {
            return "StudentEntity[id=" + id + ", name=" + name + ", score=" + score + "%]";
        }
    }
}
