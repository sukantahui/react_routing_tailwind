<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Session Example</title>
</head>
<body>
    <%
        // Get or create a session attribute "count"
        Integer count = (Integer) session.getAttribute("count");
        if (count == null) {
            count = 0;
        }
        count++;
        session.setAttribute("count", count);
    %>
    <h2>Session Tracking</h2>
    <p>You have visited this page <strong><%= count %></strong> time(s) in this session.</p>
    <p>Session ID: <%= session.getId() %></p>
</body>
</html>