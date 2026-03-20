<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<html>
<body>
  <c:set var="studentName" value="Swadeep" scope="request" />
  <c:set var="marks" value="85" scope="session" />
  
  <p>Student: <c:out value="${studentName}" /></p>
  <p>Marks: <c:out value="${marks}" /></p>
  
  <!-- Setting a bean property -->
  <c:set target="${student}" property="name" value="Tuhina" />
</body>
</html>