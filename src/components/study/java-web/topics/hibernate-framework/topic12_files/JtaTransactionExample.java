// JtaTransactionExample.java
// Shows how to use JTA transaction manager (Bitronix) with Hibernate
package com.school.hibernate;

import javax.transaction.UserTransaction;
import org.hibernate.Session;
import bitronix.tm.BitronixTransactionManager;
import bitronix.tm.TransactionManagerServices;

public class JtaTransactionExample {
    public static void main(String[] args) throws Exception {
        // Initialize Bitronix (standalone JTA provider)
        BitronixTransactionManager btm = TransactionManagerServices.getTransactionManager();

        UserTransaction utx = btm;
        Session session = null;
        try {
            utx.begin();

            session = HibernateUtil.getSessionFactory().openSession();
            // Hibernate automatically joins the JTA transaction
            Student student = new Student("Abhronila", "Naihati");
            session.persist(student);
            session.flush(); // optional

            utx.commit();
            System.out.println("JTA transaction committed across resources.");
        } catch (Exception e) {
            utx.rollback();
            System.err.println("JTA transaction rolled back: " + e.getMessage());
        } finally {
            if (session != null) session.close();
        }
    }
}