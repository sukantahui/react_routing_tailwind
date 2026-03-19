import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Demonstrates accessing container-provided objects:
 * ServletConfig, ServletContext, HttpSession.
 */
@WebServlet("/container-demo")
public class ContainerDemoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        // 1. ServletConfig: per-servlet configuration
        ServletConfig config = getServletConfig();
        String servletName = config.getServletName();

        // 2. ServletContext: application-wide shared space
        ServletContext context = getServletContext();
        String serverInfo = context.getServerInfo();

        // 3. HttpSession: user session (created by container)
        HttpSession session = req.getSession(true); // create if not exists
        Integer visitCount = (Integer) session.getAttribute("visitCount");
        if (visitCount == null) {
            visitCount = 1;
        } else {
            visitCount++;
        }
        session.setAttribute("visitCount", visitCount);

        out.println("<html><body>");
        out.println("<h2>Container Demo</h2>");
        out.println("<p>Servlet name (from ServletConfig): " + servletName + "</p>");
        out.println("<p>Server info (from ServletContext): " + serverInfo + "</p>");
        out.println("<p>Your session visit count: " + visitCount + "</p>");
        out.println("</body></html>");
    }
}