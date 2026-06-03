// BatchFetchExample.java - Using @BatchSize and JDBC batching
package com.school.perf;

import org.hibernate.annotations.BatchSize;
import javax.persistence.*;

@Entity
@BatchSize(size = 10)  // loads 10 entities per query when lazy collection accessed
public class Product {
    @Id
    private Long id;
    
    @OneToMany(mappedBy = "product")
    @BatchSize(size = 20)  // batch size for this specific association
    private List<Item> items;
}

// In hibernate.properties:
// hibernate.jdbc.batch_size=30
// hibernate.order_inserts=true
// hibernate.order_updates=true