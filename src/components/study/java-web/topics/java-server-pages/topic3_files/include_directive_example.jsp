<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Include Directive Example</title>
</head>
<body>
    <h1>Main Page</h1>
    
    <!-- Static inclusion of header -->
    <%@ include file="included_file.jsp" %>
    
    <p>This is the main content area. The variable from included file: <strong><%= sharedMessage %></strong></p>
    
    <!-- Another static inclusion (footer) -->
    <%@ include file="included_file.jsp" %>
</body>
</html>