// This is a conceptual representation of the servlet generated from SimpleJSP.jsp
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;

public final class SimpleJSP_jsp extends HttpJspBase {
    
    // Initialization method – called once
    public void jspInit() {
        // Can be overridden by the developer
        System.out.println("jspInit() called – preparing resources");
    }

    // Service method – called for every request
    public void _jspService(HttpServletRequest request, HttpServletResponse response)
            throws java.io.IOException, ServletException {
        
        response.setContentType("text/html; charset=UTF-8");
        JspWriter out = response.getWriter();
        
        try {
            out.write("<!DOCTYPE html>\r\n");
            out.write("<html>\r\n");
            out.write("<head>\r\n");
            out.write("    <title>Simple JSP</title>\r\n");
            out.write("</head>\r\n");
            out.write("<body>\r\n");
            
            // Declaration translated to instance variable
            String message = "Hello from JSP!";
            
            out.write("    <h1>");
            out.print(message);
            out.write("</h1>\r\n");
            out.write("    <p>Current time: ");
            out.print(new java.util.Date());
            out.write("</p>\r\n");
            out.write("</body>\r\n");
            out.write("</html>");
        } catch (Throwable t) {
            // Handle exception
        } finally {
            // Cleanup
        }
    }

    // Destruction method – called once before unloading
    public void jspDestroy() {
        // Can be overridden by the developer
        System.out.println("jspDestroy() called – releasing resources");
    }
}