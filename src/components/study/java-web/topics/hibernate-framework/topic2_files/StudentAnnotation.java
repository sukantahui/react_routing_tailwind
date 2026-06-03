// StudentAnnotation.java
package com.school.model;

import javax.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;
    
    @Column(name = "full_name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "age")
    private int age;
    
    // Constructors, getters, setters...
    public Student() {}
    public Student(String name, String city) {
        this.name = name;
        this.city = city;
    }
    // getters and setters omitted for brevity
}