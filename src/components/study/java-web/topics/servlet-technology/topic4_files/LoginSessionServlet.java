import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginSessionServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        // Dummy authentication
        if ("Tuhina".equals(username) && "pass123".equals(password)) {
            HttpSession session = req.getSession();
            session.setAttribute("user", username);
            session.setMaxInactiveInterval(30 * 60); // 30 minutes

            resp.sendRedirect("dashboard");
        } else {
            resp.sendRedirect("login.html?error=1");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            resp.getWriter().println("Welcome back, " + session.getAttribute("user"));
        } else {
            resp.getWriter().println("Not logged in");
        }
    }
}