import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SessionTrackingDemo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // 1. Get or create session
        HttpSession session = req.getSession();
        // 2. Store some data
        Integer visitCount = (Integer) session.getAttribute("visitCount");
        if (visitCount == null) visitCount = 0;
        visitCount++;
        session.setAttribute("visitCount", visitCount);

        // 3. Set a persistent cookie (example)
        Cookie pref = new Cookie("theme", "dark");
        pref.setMaxAge(60*60*24*30);
        pref.setPath("/");
        resp.addCookie(pref);

        // 4. Generate encoded URLs for fallback
        String nextLink = resp.encodeURL("next");

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<p>Session ID: " + session.getId() + "</p>");
        out.println("<p>Visit count: " + visitCount + "</p>");
        out.println("<a href='" + nextLink + "'>Next page</a>");
    }
}