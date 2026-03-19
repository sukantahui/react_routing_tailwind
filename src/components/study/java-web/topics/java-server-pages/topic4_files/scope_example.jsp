<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Scope Example</title>
</head>
<body>
    <h2>Session Scoped Bean</h2>
    
    <jsp:useBean id="counter" class="com.example.beans.Counter" scope="session" />
    
    <jsp:setProperty name="counter" property="count" value="0" />
    
    <%
        // Increment counter
        counter.setCount(counter.getCount() + 1);
    %>
    
    <p>This page has been accessed <jsp:getProperty name="counter" property="count" /> time(s) in this session.</p>
    <p><a href="scope_example.jsp">Refresh</a> to see the count increase.</p>
    
    <!-- Note: You need a Counter bean for this to work -->
    <!-- Counter.java: public class Counter { private int count; // getter/setter } -->
</body>
</html>