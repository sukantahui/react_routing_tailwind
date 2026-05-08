import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        
        // Dummy authentication
        if ("admin".equals(username) && "secret".equals(password)) {
            // Success: redirect to dashboard (avoid form re-submit)
            resp.sendRedirect(req.getContextPath() + "/dashboard");
        } else {
            // Failure: forward back to login page with error message
            req.setAttribute("error", "Invalid credentials");
            RequestDispatcher dispatcher = req.getRequestDispatcher("/login.html");
            dispatcher.forward(req, resp);
        }
    }
}