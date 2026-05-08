import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class RedirectServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Process form submission (e.g., save data)
        String data = req.getParameter("data");
        System.out.println("Saved: " + data);
        
        // Redirect to a different page (POST-Redirect-GET pattern)
        String redirectUrl = req.getContextPath() + "/success";
        resp.sendRedirect(redirectUrl);
        // IMPORTANT: return to avoid further processing
        return;
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Show a form that POSTs to this servlet
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<form method='post'>");
        out.println("<input type='text' name='data'/>");
        out.println("<button type='submit'>Submit</button>");
        out.println("</form>");
    }
}