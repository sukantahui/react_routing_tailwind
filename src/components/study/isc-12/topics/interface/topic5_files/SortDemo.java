// SortDemo.java
import java.util.*;

public class SortDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Abhronila", 92, "Barrackpore"));
        students.add(new Student("Debangshu", 88, "Shyamnagar"));
        students.add(new Student("Swadeep", 95, "Naihati"));
        students.add(new Student("Tuhina", 91, "Ichapur"));

        System.out.println("Before sorting:");
        for (Student s : students) System.out.println(s);

        // Uses compareTo() defined in Student
        Collections.sort(students);

        System.out.println("\nAfter sorting by marks (descending):");
        for (Student s : students) System.out.println(s);
    }
}