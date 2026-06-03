// CustomDataSource.java - Manually create HikariCP DataSource and pass to Hibernate
package com.school.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

import javax.sql.DataSource;

public class CustomDataSource {
    public static SessionFactory buildSessionFactory() {
        // Create HikariCP DataSource programmatically
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/school_db");
        config.setUsername("swadeep");
        config.setPassword("secure123");
        config.setMaximumPoolSize(15);
        config.setMinimumIdle(5);
        config.setLeakDetectionThreshold(15000);
        config.setPoolName("SchoolPool");
        
        HikariDataSource dataSource = new HikariDataSource(config);
        
        // Pass DataSource to Hibernate
        Configuration hibernateConfig = new Configuration();
        hibernateConfig.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        hibernateConfig.setProperty("hibernate.show_sql", "true");
        hibernateConfig.setProperty("hibernate.hbm2ddl.auto", "update");
        hibernateConfig.setProperty("hibernate.connection.provider_class", 
            "org.hibernate.hikaricp.internal.HikariCPConnectionProvider");
        hibernateConfig.setProperty("hibernate.hikari.dataSource", 
            dataSource.toString()); // Or use addDataSource()
        
        // Alternatively, directly set DataSource
        hibernateConfig.getProperties().put("hibernate.connection.datasource", dataSource);
        
        return hibernateConfig.buildSessionFactory();
    }
}