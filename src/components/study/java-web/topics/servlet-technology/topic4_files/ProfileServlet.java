import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ProfileServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession();
        // Always encode URLs before outputting them
        String profileLink = resp.encodeURL("profile/view");
        String editLink = resp.encodeURL("profile/edit");
        // For redirects:
        String redirectLocation = resp.encodeRedirectURL("dashboard");

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<a href='" + profileLink + "'>View Profile</a><br/>");
        out.println("<a href='" + editLink + "'>Edit Profile</a>");
    }
}