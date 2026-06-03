import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class AuthenticationFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);
        boolean loggedIn = (session != null && session.getAttribute("user") != null);
        String loginURI = req.getContextPath() + "/login.html";

        boolean isLoginRequest = req.getRequestURI().equals(loginURI);
        boolean isLoginAction = req.getRequestURI().endsWith("/login");

        if (loggedIn || isLoginRequest || isLoginAction) {
            chain.doFilter(request, response);
        } else {
            res.sendRedirect(loginURI);
        }
    }

    @Override
    public void destroy() {}
}