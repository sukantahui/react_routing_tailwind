import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ErrorFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        try {
            chain.doFilter(request, response);
        } catch (Exception e) {
            // Log the full stack trace
            e.printStackTrace();
            // Send a clean error response
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            res.setContentType("text/html");
            res.getWriter().println("<h2>System Error</h2><p>Please try again later.</p>");
        }
    }
    @Override public void init(FilterConfig config) {}
    @Override public void destroy() {}
}