import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.transaction.UserTransaction;

/**
 * A conceptual class that attempts to detect whether it's running in a
 * full Java EE environment by looking up JNDI resources that are only
 * present in an application server.
 */
public class ServerComparison {

    public static void main(String[] args) {
        System.out.println("Server Type Detection Demo");
        System.out.println("==========================");

        // Check for UserTransaction (available only in full EE servers)
        try {
            InitialContext ctx = new InitialContext();
            UserTransaction ut = (UserTransaction) ctx.lookup("java:comp/UserTransaction");
            System.out.println("✓ UserTransaction found – this is a full Java EE server.");
        } catch (NamingException e) {
            System.out.println("✗ UserTransaction NOT found – likely a web server (servlet container).");
        }

        // Check for EJB environment (optional)
        try {
            InitialContext ctx = new InitialContext();
            Object ejbModule = ctx.lookup("java:module");
            System.out.println("✓ EJB module context found – EJB container present.");
        } catch (NamingException e) {
            System.out.println("✗ No EJB context – this is not a full EE server (or no EJBs deployed).");
        }
    }
}