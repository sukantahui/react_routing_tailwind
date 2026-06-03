import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(
    name = "UserServlet",
    urlPatterns = { "/profile", "/user/info" },
    loadOnStartup = 1,
    description = "Handles user profile requests"
)
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.getWriter().println("<h2>User Profile Page</h2>");
    }
}