// SessionMethodsExample.java
// Shows typical session usage: open, transaction, CRUD, close

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class SessionMethodsExample {
    public void demoSession() {
        SessionFactory factory = SessionFactoryExample.getSessionFactory();
        Session session = null;
        Transaction tx = null;
        try {
            // 1. Open session
            session = factory.openSession();
            // 2. Begin transaction
            tx = session.beginTransaction();

            // 3. Perform operations
            Student student = new Student("Swadeep", "Barrackpore");
            session.save(student);                 // INSERT
            Student found = session.get(Student.class, 1L); // SELECT by PK
            found.setCity("Shyamnagar");           // UPDATE on flush
            session.delete(found);                 // DELETE

            // 4. Commit transaction (flushes changes to DB)
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            // 5. Close session (returns connection to pool)
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }
}