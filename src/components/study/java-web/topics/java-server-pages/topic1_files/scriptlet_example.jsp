<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Scriptlet Example</title>
</head>
<body>
    <h1>Welcome</h1>
    <%
        // Scriptlet: reading parameter and setting a variable
        String user = request.getParameter("user");
        if (user == null || user.isEmpty()) {
            user = "Guest";
        }
    %>
    <p>Hello, <%= user %>!</p>
</body>
</html>