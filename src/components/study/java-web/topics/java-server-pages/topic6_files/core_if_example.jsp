<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<html>
<body>
  <c:set var="score" value="75" scope="request" />
  
  <c:if test="${score >= 60}">
    <p>Congratulations! You passed.</p>
  </c:if>
  
  <c:if test="${score < 60}" var="isFail">
    <p>Better luck next time.</p>
  </c:if>
  
  <p>Failed? ${isFail}</p>
</body>
</html>