<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
    <h1>XSS Safe</h1>
    <div>Your input: <c:out value="${param.comment}" /></div>
</body>
</html>