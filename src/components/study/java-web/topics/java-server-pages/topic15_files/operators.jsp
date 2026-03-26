<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="x" value="10" />
<c:set var="y" value="3" />
<c:set var="age" value="20" />
<html>
<body>
    Arithmetic: ${x + y} (sum), ${x - y} (difference), ${x * y} (product), ${x / y} (quotient)<br/>
    Relational: ${x > y} (greater), ${x == 10} (equal)<br/>
    Logical: ${age >= 18 && age <= 60} (adult)<br/>
    Empty: ${empty param.name} (name param not present)<br/>
</body>
</html>