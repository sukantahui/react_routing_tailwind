<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<body>
    <h1>XSS Vulnerable</h1>
    <div>Your input: <%= request.getParameter("comment") %></div>
</body>
</html>