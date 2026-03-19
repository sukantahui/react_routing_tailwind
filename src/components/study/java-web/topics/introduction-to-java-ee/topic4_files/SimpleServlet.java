import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * A simple Servlet that runs on any servlet container (Tomcat, Jetty, GlassFish, etc.).
 * It responds with a plain text message.
 */
@WebServlet("/hello")
public class SimpleServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("text/plain");
        resp.getWriter().println("Hello from SimpleServlet running on "
                + getServletContext().getServerInfo());
    }
}