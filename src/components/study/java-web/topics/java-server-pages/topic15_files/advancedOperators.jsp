<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="score" value="85" />
<c:set var="items" value="${null}" />
<html>
<body>
    Conditional (ternary): ${score >= 60 ? 'Pass' : 'Fail'}<br/>
    Empty check: Cart is ${empty items ? 'empty' : 'not empty'}<br/>
    Using 'and' alias: ${score ge 60 and score le 100} (valid score)<br/>
</body>
</html>