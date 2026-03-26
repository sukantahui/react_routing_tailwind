<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<fmt:setLocale value="en_IN" />
<fmt:setBundle basename="messages" />
<html>
<body>
    <h2><fmt:message key="welcome.title" /></h2>
    <c:set var="price" value="1234567.89" />
    <p><fmt:message key="price.label" />: <fmt:formatNumber value="${price}" type="currency" /></p>
    <c:set var="userInput" value="   abc   " />
    <p>Input trimmed length: ${fn:length(fn:trim(userInput))}</p>
</body>
</html>