import javax.ejb.Stateless;

/**
 * A simple Stateless Session Bean (EJB).
 * This will ONLY deploy on a full Java EE application server
 * (GlassFish, Payara, WildFly) – NOT on Tomcat or Jetty.
 */
@Stateless
public class MyEJB {

    public String sayHello(String name) {
        return "Hello, " + name + " – from an EJB!";
    }

    public int add(int a, int b) {
        return a + b;
    }
}