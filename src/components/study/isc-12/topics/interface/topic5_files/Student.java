// Student.java
public class Student implements Comparable<Student> {
    private String name;
    private int marks;
    private String city;

    public Student(String name, int marks, String city) {
        this.name = name;
        this.marks = marks;
        this.city = city;
    }

    @Override
    public int compareTo(Student other) {
        // Sort by marks descending (higher marks first)
        return Integer.compare(other.marks, this.marks);
    }

    @Override
    public String toString() {
        return name + " (" + city + ") - " + marks + " marks";
    }

    public int getMarks() { return marks; }
    public String getName() { return name; }
}