<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Plugin Action (Applet) Example</title>
</head>
<body>
    <h2>Interactive Chart Applet</h2>
    <jsp:plugin type="applet" code="ChartApplet.class" codebase="/applets" width="500" height="300">
        <jsp:fallback>
            <p>Your browser does not support Java applets.</p>
        </jsp:fallback>
    </jsp:plugin>
    <p>Note: Applets are deprecated. This is shown only for historical understanding.</p>
</body>
</html>