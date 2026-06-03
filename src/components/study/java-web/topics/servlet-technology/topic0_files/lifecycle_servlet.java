import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LifecycleServlet extends HttpServlet {
    
    // Called once when servlet is loaded and instantiated
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        System.out.println("[LOG] Servlet initialized: " + getServletName());
        // Real-world usage: Load DB drivers, read config params, start background threads
        String dbUrl = config.getInitParameter("dbUrl");
        System.out.println("DB URL from web.xml: " + dbUrl);
    }
    
    // Called for every client request (GET, POST, etc.)
    public void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        System.out.println("[LOG] Handling request: " + req.getMethod());
        resp.setContentType("text/html");
        resp.getWriter().println("<h1>Hello from Servlet Lifecycle!</h1>");
        // For thread safety: avoid mutable instance variables
    }
    
    // Called once before servlet is unloaded (container shutdown / app reload)
    public void destroy() {
        System.out.println("[LOG] Servlet destroyed: " + getServletName());
        // Cleanup: close DB connections, stop threads, release resources
    }
}