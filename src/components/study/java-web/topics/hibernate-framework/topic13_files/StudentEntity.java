// StudentEntity.java - JPA entity with Bean Validation constraints
package com.school.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Length(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name must contain only letters and spaces")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Min(value = 5, message = "Age must be at least 5")
    @Max(value = 18, message = "Age must be at most 18")
    private Integer age;

    @NotNull(message = "City is required")
    private String city;

    @Past(message = "Birth date must be in the past")
    private java.util.Date birthDate;

    // constructors, getters, setters omitted for brevity
}