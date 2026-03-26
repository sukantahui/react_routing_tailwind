<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="now" class="java.util.Date" />
<html>
<body>
    <h3>Date Formatting Examples</h3>
    <p>Short date: <fmt:formatDate value="${now}" type="date" dateStyle="short" /></p>
    <p>Long date: <fmt:formatDate value="${now}" type="date" dateStyle="long" /></p>
    <p>Custom pattern: <fmt:formatDate value="${now}" pattern="dd-MM-yyyy HH:mm:ss" /></p>
</body>
</html>