<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>EL Implicit Objects</title>
</head>
<body>
    <h2>Using EL Implicit Objects</h2>
    <p>Request parameter 'name': ${param.name}</p>
    <p>User-Agent header: ${header["User-Agent"]}</p>
    <p>Cookie JSESSIONID: ${cookie.JSESSIONID.value}</p>
    <p>Context path: ${pageContext.request.contextPath}</p>
    <p>Session ID: ${pageContext.session.id}</p>
</body>
</html>