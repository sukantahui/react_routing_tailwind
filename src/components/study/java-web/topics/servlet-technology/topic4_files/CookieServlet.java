import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class CookieServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Create a cookie
        Cookie userCookie = new Cookie("username", "Swadeep");
        userCookie.setMaxAge(60 * 60 * 24); // 1 day
        userCookie.setPath("/");
        userCookie.setHttpOnly(true);
        resp.addCookie(userCookie);

        // Read cookies from request
        Cookie[] cookies = req.getCookies();
        String userName = null;
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("username".equals(c.getName())) {
                    userName = c.getValue();
                    break;
                }
            }
        }

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<h2>Hello " + (userName != null ? userName : "Guest") + "</h2>");
        out.println("<p>Cookie has been set (if not already).</p>");
    }
}