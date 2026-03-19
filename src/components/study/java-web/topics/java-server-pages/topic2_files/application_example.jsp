<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Application Example</title>
</head>
<body>
    <%
        // Application-wide counter
        Integer totalVisits = (Integer) application.getAttribute("totalVisits");
        if (totalVisits == null) {
            totalVisits = 0;
        }
        totalVisits++;
        application.setAttribute("totalVisits", totalVisits);
    %>
    <h2>Global Hit Counter</h2>
    <p>Total visits to this application: <strong><%= totalVisits %></strong></p>
    <p>Server info: <%= application.getServerInfo() %></p>
    <p>Real path: <%= application.getRealPath("/") %></p>
</body>
</html>