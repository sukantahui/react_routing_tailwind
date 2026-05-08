import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.logging.Logger;

public class LoggingFilter implements Filter {
    private static final Logger log = Logger.getLogger(LoggingFilter.class.getName());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("LoggingFilter initialized");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        long start = System.nanoTime();
        log.info("Request URL: " + req.getRequestURL() + ", Method: " + req.getMethod());
        chain.doFilter(request, response);
        long end = System.nanoTime();
        log.info("Request processed in " + (end - start) / 1_000_000 + " ms");
    }

    @Override
    public void destroy() {
        log.info("LoggingFilter destroyed");
    }
}