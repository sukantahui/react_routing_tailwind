// HibernateUtil.java - SessionFactory singleton from properties file
package com.school.hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.io.InputStream;
import java.util.Properties;

public class HibernateUtil {
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            // Load hibernate.properties from classpath
            Properties props = new Properties();
            try (InputStream input = HibernateUtil.class.getClassLoader()
                    .getResourceAsStream("hibernate.properties")) {
                if (input == null) {
                    throw new RuntimeException("hibernate.properties not found in classpath");
                }
                props.load(input);
            }

            // Programmatically build Configuration
            Configuration configuration = new Configuration();
            configuration.addProperties(props);
            // Optionally add annotated entity classes here:
            // configuration.addAnnotatedClass(Student.class);

            return configuration.buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }
}