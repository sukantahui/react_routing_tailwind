import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class JdbcAuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            chain.doFilter(request, response);
            return;
        }
        // Assume login request passes credentials
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username != null && password != null) {
            try (Connection conn = DriverManager.getConnection("jdbc:h2:~/school", "sa", "")) {
                PreparedStatement stmt = conn.prepareStatement("SELECT role FROM users WHERE username=? AND password_hash=?");
                stmt.setString(1, username);
                stmt.setString(2, hash(password));
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    req.getSession().setAttribute("user", username);
                    req.getSession().setAttribute("role", rs.getString("role"));
                }
            } catch (SQLException e) { e.printStackTrace(); }
        }
        chain.doFilter(request, response);
    }
    private String hash(String pwd) { return pwd; } // placeholder - use bcrypt in real code
    @Override public void init(FilterConfig fc) {}
    @Override public void destroy() {}
}