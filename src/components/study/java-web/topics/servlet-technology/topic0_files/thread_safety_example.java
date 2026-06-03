// UNSAFE pattern - do NOT use mutable instance variables
public class UnsafeServlet extends HttpServlet {
    private String sharedData; // ❌ All threads share this!
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        sharedData = req.getParameter("input"); // Race condition
        resp.getWriter().print(sharedData);
    }
}

// SAFE approach - use local variables or synchronized only if necessary
public class SafeServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        String localData = req.getParameter("input"); // ✅ thread-local
        resp.getWriter().print(localData);
    }
}