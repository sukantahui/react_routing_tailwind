<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head><title>Something went wrong</title></head>
<body>
    <h2>Oops! An error occurred.</h2>
    <p>We are sorry for the inconvenience. Please try again later.</p>
    <hr/>
    <p>Error details (visible only during development):</p>
    <pre><%= exception.getMessage() %></pre>
    <%-- In production, you would log the exception and not display it --%>
</body>
</html>