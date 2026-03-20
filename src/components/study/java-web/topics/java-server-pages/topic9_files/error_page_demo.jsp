<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="custom_error_page.jsp" %>
<!DOCTYPE html>
<html>
<head><title>Error Demo</title></head>
<body>
    <h2>Welcome to Barrackpore</h2>
    <%
        // Simulate an exception
        String name = null;
        int length = name.length();  // This will throw NullPointerException
    %>
</body>
</html>