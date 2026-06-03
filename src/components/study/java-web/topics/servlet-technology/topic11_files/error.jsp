<%@ page isErrorPage="true" language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h2>Something went wrong</h2>
    <p>We're sorry, but an error occurred while processing your request.</p>
    <p>Error details (for support): <%= exception.getMessage() %></p>
    <p>Please go back to <a href="${pageContext.request.contextPath}/">home page</a>.</p>
</body>
</html>