import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebFilter(
    filterName = "AuthFilter",
    urlPatterns = { "/admin/*", "/dashboard/*" },
    dispatcherTypes = { DispatcherType.REQUEST, DispatcherType.FORWARD }
)
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            chain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).sendRedirect(req.getContextPath() + "/login");
        }
    }
    @Override public void init(FilterConfig config) {}
    @Override public void destroy() {}
}