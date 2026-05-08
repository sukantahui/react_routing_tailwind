import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebFilter(urlPatterns = { "/secure/*", "/dashboard/*" })
public class AuthenticationFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);

        boolean loggedIn = (session != null && session.getAttribute("user") != null);
        String loginURI = req.getContextPath() + "/login.html";

        if (loggedIn) {
            chain.doFilter(request, response);
        } else {
            res.sendRedirect(loginURI);
        }
    }
    @Override public void init(FilterConfig filterConfig) {}
    @Override public void destroy() {}
}