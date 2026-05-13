// EmbeddedExample.java
package com.school.model;

import javax.persistence.*;

// Embeddable – reusable component, no table
@Embeddable
public class Address {
    private String street;
    private String city;
    private String zipCode;
    // getters/setters...
}

// Entity using embedded component
@Entity
public class Employee {
    @Id @GeneratedValue
    private Long id;
    
    @Embedded  // Columns: street, city, zipCode
    private Address homeAddress;
    
    @AttributeOverrides({  // Override column names for same embeddable type
        @AttributeOverride(name = "street", column = @Column(name = "office_street")),
        @AttributeOverride(name = "city", column = @Column(name = "office_city")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "office_zip"))
    })
    @Embedded
    private Address officeAddress;
}