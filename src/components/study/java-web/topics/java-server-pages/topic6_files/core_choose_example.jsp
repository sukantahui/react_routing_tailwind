<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<html>
<body>
  <c:set var="grade" value="B" />
  
  <c:choose>
    <c:when test="${grade == 'A'}">
      <p>Excellent work, Abhronila!</p>
    </c:when>
    <c:when test="${grade == 'B'}">
      <p>Good job, Debangshu!</p>
    </c:when>
    <c:otherwise>
      <p>Keep improving, keep learning!</p>
    </c:otherwise>
  </c:choose>
</body>
</html>