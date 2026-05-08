import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class RoleBasedServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        if (request.isUserInRole("admin")) {
            resp.getWriter().println("Admin content: secret data");
        } else if (request.isUserInRole("user")) {
            resp.getWriter().println("User content: limited data");
        } else {
            resp.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
    }
}