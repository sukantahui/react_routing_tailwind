import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class IncludeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Write main content
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<h1>Main Content</h1>");
        
        // Include a footer from another resource
        RequestDispatcher dispatcher = req.getRequestDispatcher("/footer.jsp");
        dispatcher.include(req, resp);
        
        out.println("</body></html>");
    }
}