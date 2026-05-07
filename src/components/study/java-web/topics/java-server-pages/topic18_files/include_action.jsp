<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Include Example</title>
</head>
<body>
    <h1>Main Page</h1>
    <p>Current time: <%= new java.util.Date() %></p>
    
    <!-- Dynamic include with a parameter -->
    <jsp:include page="banner.jsp">
        <jsp:param name="userType" value="student" />
        <jsp:param name="location" value="Barrackpore" />
    </jsp:include>
    
    <p>Rest of the main page content...</p>
</body>
</html>