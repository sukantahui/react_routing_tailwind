package com.school.model;

import java.io.Serializable;

public class StudentBean implements Serializable {
    private String name;
    private int age;
    private String className; // e.g., "10th"

    public StudentBean() {
        // No-arg constructor
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}