import javax.sql.rowset.WebRowSet;
import javax.sql.rowset.RowSetProvider;
import java.io.FileReader;
import java.io.FileWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class WebRowSetExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String password = "password";
        String xmlFile = "students.xml";

        // Write to XML
        try (Connection conn = DriverManager.getConnection(url, user, password);
             WebRowSet wrs = RowSetProvider.newFactory().createWebRowSet()) {

            wrs.setCommand("SELECT id, name, age, city FROM students");
            wrs.execute(conn);

            try (FileWriter writer = new FileWriter(xmlFile)) {
                wrs.writeXml(writer);
                System.out.println("Data written to " + xmlFile);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // Read from XML
        try (WebRowSet wrs2 = RowSetProvider.newFactory().createWebRowSet();
             FileReader reader = new FileReader(xmlFile)) {

            wrs2.readXml(reader);
            while (wrs2.next()) {
                System.out.printf("%d: %s%n", wrs2.getInt("id"), wrs2.getString("name"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}