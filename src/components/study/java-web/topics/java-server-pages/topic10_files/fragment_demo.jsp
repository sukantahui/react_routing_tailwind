<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="my" uri="/WEB-INF/tlds/mytags.tld" %>
<c:set var="items" value="['Barrackpore','Shyamnagar','Ichapur']" />
<my:repeat times="3">
    <li>Item number ${status.count}</li>
</my:repeat>