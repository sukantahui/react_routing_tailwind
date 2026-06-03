import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ErrorServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            // Simulate a risky operation
            String param = req.getParameter("id");
            if (param == null) {
                throw new IllegalArgumentException("Missing ID parameter");
            }
            int id = Integer.parseInt(param);
            // Process normally...
            resp.getWriter().println("Valid ID: " + id);
        } catch (NumberFormatException e) {
            // Log error (server side)
            log("NumberFormatException: " + e.getMessage());
            // Forward to custom error page with details
            req.setAttribute("errorMsg", "Invalid number format: " + e.getMessage());
            req.setAttribute("status", 400);
            RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/error/badRequest.jsp");
            dispatcher.forward(req, resp);
        } catch (IllegalArgumentException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }
}