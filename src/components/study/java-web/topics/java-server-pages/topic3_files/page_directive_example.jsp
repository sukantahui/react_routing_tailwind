<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, java.io.*" %>
<%@ page session="true" buffer="16kb" autoFlush="true" %>
<%@ page errorPage="error.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <title>Page Directive Example</title>
</head>
<body>
    <h2>Page Directive Demo</h2>
    <p>Today's date: <%= new Date() %></p>
    <p>Session ID: <%= session.getId() %></p>
    <p>Buffer size: <%= out.getBufferSize() %></p>
    <%
        // Using imported classes
        List<String> names = Arrays.asList("Swadeep", "Tuhina", "Abhronila");
    %>
    <p>Names list: <%= names %></p>
</body>
</html>