<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Simple JSP</title>
</head>
<body>
    <%! String message = "Hello from JSP!"; %>
    <h1><%= message %></h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>