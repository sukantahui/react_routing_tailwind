// StatisticsExample.java - Enabling and reading Hibernate statistics
package com.school.perf;

import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;

public class StatisticsExample {
    public static void enableAndLogStats() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        Statistics stats = sf.getStatistics();
        stats.setStatisticsEnabled(true);
        
        // perform some operations...
        
        System.out.println("Entity load count: " + stats.getEntityLoadCount());
        System.out.println("Query execution count: " + stats.getQueryExecutionCount());
        System.out.println("Second-level cache hit count: " + stats.getSecondLevelCacheHitCount());
        System.out.println("Connection acquisition count: " + stats.getConnectCount());
        
        // Optionally reset after each test
        stats.clear();
    }
}
// In hibernate.properties: hibernate.generate_statistics=true