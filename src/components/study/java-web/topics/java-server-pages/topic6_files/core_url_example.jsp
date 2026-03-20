<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<html>
<body>
  <c:url value="/student/profile.jsp" var="profileUrl">
    <c:param name="id" value="1001" />
    <c:param name="name" value="Swadeep" />
  </c:url>
  
  <a href="${profileUrl}">View Swadeep's Profile</a>
</body>
</html>