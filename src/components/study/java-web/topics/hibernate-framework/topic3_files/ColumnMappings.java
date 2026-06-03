// ColumnMappings.java
package com.school.model;

import javax.persistence.*;

@Entity
@Table(name = "student_details")
public class StudentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "full_name", length = 100, nullable = false)
    private String name;
    
    @Column(unique = true, length = 20)
    private String rollNumber;
    
    @Column(precision = 10, scale = 2)  // e.g., DECIMAL(10,2)
    private Double feeBalance;
    
    @Column(insertable = false, updatable = false)  // read-only column
    private String createdBySystem;
    
    // getters/setters omitted
}