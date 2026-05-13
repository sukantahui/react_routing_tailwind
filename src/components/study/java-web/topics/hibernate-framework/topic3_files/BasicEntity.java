// BasicEntity.java
package com.school.model;

import javax.persistence.*;

@Entity  // Marks this class as entity
@Table(name = "students")  // Optional: table name (defaults to "Student")
public class Student {
    @Id  // Primary key
    private Long id;
    
    private String name;
    private String city;
    
    // No-arg constructor (required)
    public Student() {}
    
    public Student(String name, String city) {
        this.name = name;
        this.city = city;
    }
    
    // getters and setters...
}