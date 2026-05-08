import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebServlet("/admin/panel")
@ServletSecurity(
    value = @HttpConstraint(rolesAllowed = {"admin"}),
    httpMethodConstraints = {
        @HttpMethodConstraint(value = "GET", rolesAllowed = {"admin", "auditor"}),
        @HttpMethodConstraint(value = "POST", rolesAllowed = {"admin"})
    }
)
public class SecureServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.getWriter().println("<h2>Admin Panel</h2><p>Welcome, " + req.getUserPrincipal().getName() + "</p>");
    }
}