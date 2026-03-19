<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Request Example</title>
</head>
<body>
    <%
        // Using request object
        String name = request.getParameter("username");
        if (name == null) name = "Guest";
        
        // Using response object to add a cookie
        Cookie c = new Cookie("lastUser", name);
        response.addCookie(c);
        
        // Using out object to write HTML
        out.println("<h1>Hello, " + name + "!</h1>");
    %>
    <p>Request method: <%= request.getMethod() %></p>
    <p>User-Agent: <%= request.getHeader("User-Agent") %></p>
</body>
</html>