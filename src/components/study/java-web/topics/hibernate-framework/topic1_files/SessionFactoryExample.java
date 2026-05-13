// SessionFactoryExample.java
// Demonstrates creating SessionFactory (once per application)

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class SessionFactoryExample {
    private static SessionFactory sessionFactory;

    // Static initializer - thread-safe, runs once when class loads
    static {
        try {
            sessionFactory = new Configuration()
                    .configure("hibernate.cfg.xml")   // loads XML configuration
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();  // close all connections
        }
    }
}