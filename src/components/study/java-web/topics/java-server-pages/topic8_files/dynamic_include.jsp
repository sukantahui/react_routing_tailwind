<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Include Example</title>
</head>
<body>
    <h1>Welcome to Shyamnagar</h1>
    <p>This content is generated at request time.</p>

    <!-- Dynamic include action -->
    <jsp:include page="included_file.jsp">
        <jsp:param name="color" value="blue" />
    </jsp:include>
</body>
</html>