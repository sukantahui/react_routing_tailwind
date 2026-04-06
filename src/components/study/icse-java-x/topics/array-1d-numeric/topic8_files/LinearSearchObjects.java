class Student {
    String name;
    int rollNo;
    
    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Student student = (Student) obj;
        return rollNo == student.rollNo;
    }
    
    @Override
    public String toString() {
        return name + "(" + rollNo + ")";
    }
}

public class LinearSearchObjects {
    
    public static int searchStudent(Student[] students, int rollNo) {
        Student target = new Student("", rollNo);
        for (int i = 0; i < students.length; i++) {
            if (students[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        Student[] class8 = {
            new Student("Swadeep", 101),
            new Student("Tuhina", 102),
            new Student("Abhronila", 103),
            new Student("Nandini", 104),
            new Student("Riddhiman", 105)
        };
        
        int searchRoll = 103;
        int position = searchStudent(class8, searchRoll);
        
        if (position != -1) {
            System.out.println("Student found: " + class8[position]);
            System.out.println("Position: " + position);
        } else {
            System.out.println("Student with roll " + searchRoll + " not found");
        }
    }
}