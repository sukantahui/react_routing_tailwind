import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ForwardServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Set an attribute to be available in the forwarded JSP
        req.setAttribute("message", "Hello from ForwardServlet!");
        // Forward to a JSP inside WEB-INF (protected from direct access)
        RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/result.jsp");
        dispatcher.forward(req, resp);
    }
}