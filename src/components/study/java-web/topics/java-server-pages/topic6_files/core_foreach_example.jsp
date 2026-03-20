<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page import="java.util.*" %>
<html>
<body>
  <%
    List<String> cities = Arrays.asList("Barrackpore", "Shyamnagar", "Ichapur", "Naihati");
    request.setAttribute("cities", cities);
  %>
  
  <ul>
    <c:forEach items="${cities}" var="city" varStatus="loop">
      <li>${loop.index + 1}. ${city}</li>
    </c:forEach>
  </ul>
  
  <!-- Number range iteration -->
  <c:forEach begin="1" end="5" var="num">
    <p>Number: ${num}</p>
  </c:forEach>
</body>
</html>