<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<body>
    <c:set var="testString" value="Hello, Barrackpore!" />
    <p>Contains "Barrackpore"? ${fn:contains(testString, "Barrackpore")}</p>
    <p>Starts with "Hello"? ${fn:startsWith(testString, "Hello")}</p>
    <p>Length: ${fn:length(testString)}</p>
    <c:set var="fruits" value="apple,banana,orange" />
    <p>Split and join: ${fn:join(fn:split(fruits, ","), " | ")}</p>
</body>
</html>