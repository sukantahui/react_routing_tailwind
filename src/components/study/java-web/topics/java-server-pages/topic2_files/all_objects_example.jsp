<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>All Objects Demo</title>
</head>
<body>
    <h2>Demonstrating Multiple Implicit Objects</h2>
    
    <%
        // request
        String client = request.getRemoteAddr();
        
        // session
        Integer sessionCount = (Integer) session.getAttribute("sessionCount");
        if (sessionCount == null) sessionCount = 0;
        sessionCount++;
        session.setAttribute("sessionCount", sessionCount);
        
        // application
        Integer appCount = (Integer) application.getAttribute("appCount");
        if (appCount == null) appCount = 0;
        appCount++;
        application.setAttribute("appCount", appCount);
        
        // pageContext – storing in page scope
        pageContext.setAttribute("pageMessage", "Hello from page scope", PageContext.PAGE_SCOPE);
        
        // out
        out.println("<p>Client IP: " + client + "</p>");
        out.println("<p>Your session count: " + sessionCount + "</p>");
        out.println("<p>Total application visits: " + appCount + "</p>");
        out.println("<p>Page scoped message: " + pageContext.getAttribute("pageMessage") + "</p>");
    %>
    
    <p>Config init parameter (if any): <%= config.getInitParameter("exampleParam") != null ? config.getInitParameter("exampleParam") : "none" %></p>
    <p>Is this the same as 'this'? <%= page.equals(this) %></p>
    
    <%-- Exception not used here because it's not an error page --%>
</body>
</html>