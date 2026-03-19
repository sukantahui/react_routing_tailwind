import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Demonstrates the servlet lifecycle methods.
 * Deploy this servlet and watch the console logs to see when the container
 * calls init(), service(), and destroy().
 */
@WebServlet("/lifecycle")
public class LifecycleDemoServlet extends HttpServlet {

    private int requestCount = 0;

    @Override
    public void init() throws ServletException {
        System.out.println("LifecycleDemoServlet: init() called. Servlet initialized.");
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        requestCount++;
        System.out.println("LifecycleDemoServlet: service() called. Request count: " + requestCount);
        // Let the superclass handle the HTTP method dispatch
        super.service(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("text/plain");
        resp.getWriter().println("LifecycleDemoServlet: doGet() called. Request count: " + requestCount);
    }

    @Override
    public void destroy() {
        System.out.println("LifecycleDemoServlet: destroy() called. Servlet being taken out of service.");
    }
}