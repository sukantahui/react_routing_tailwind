import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MvcServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Model: fetch data (e.g., from database)
        List<String> students = Arrays.asList("Swadeep", "Tuhina", "Abhronila");
        
        // Store model in request attribute
        req.setAttribute("studentList", students);
        
        // Forward to JSP view (inside WEB-INF)
        RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/studentView.jsp");
        dispatcher.forward(req, resp);
    }
}