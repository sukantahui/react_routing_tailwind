<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
    <h3>Implicit Objects</h3>
    Request parameter 'name': ${param.name}<br/>
    User-Agent header: ${header['User-Agent']}<br/>
    Cookie 'JSESSIONID': ${cookie.JSESSIONID.value}<br/>
    Context param 'adminEmail': ${initParam.adminEmail}<br/>
    Context path: ${pageContext.request.contextPath}<br/>
    Session ID: ${pageContext.session.id}<br/>
</body>
</html>