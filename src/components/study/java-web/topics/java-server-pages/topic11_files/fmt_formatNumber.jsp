<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<body>
    <h3>Number Formatting Examples</h3>
    <p>Currency: <fmt:formatNumber value="1234567.89" type="currency" /></p>
    <p>Percent: <fmt:formatNumber value="0.85" type="percent" /></p>
    <p>Custom pattern: <fmt:formatNumber value="1234567.89" pattern="#,##0.00" /></p>
</body>
</html>