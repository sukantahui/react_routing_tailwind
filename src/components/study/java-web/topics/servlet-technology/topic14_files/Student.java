package com.school.model;

public class Student {
    private String name;
    private int rollNo;
    private String grade;

    public Student() {}

    public Student(String name, int rollNo, String grade) {
        this.name = name;
        this.rollNo = rollNo;
        this.grade = grade;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getRollNo() { return rollNo; }
    public void setRollNo(int rollNo) { this.rollNo = rollNo; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}