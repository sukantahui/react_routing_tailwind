/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 3: lastIndexOf() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class LastIndexOfMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("        LASTINDEXOF() METHOD IN JAVA (ICSE)       ");
        System.out.println("==================================================");

        String path = "E:/ICSE/Computer/JavaProject.java";
        System.out.println("File Path: \"" + path + "\"");

        // 1. Finding the last slash to extract filename
        int lastSlash = path.lastIndexOf('/');
        String fileName = path.substring(lastSlash + 1);
        System.out.println("\n[1] Last slash position : " + lastSlash);
        System.out.println("    Extracted File Name: \"" + fileName + "\"");

        // 2. Finding last dot to extract file extension
        int lastDot = path.lastIndexOf('.');
        String extension = path.substring(lastDot + 1);
        System.out.println("\n[2] Last dot position   : " + lastDot);
        System.out.println("    File Extension     : \"" + extension + "\"");

        // 3. Extracting surname from full name
        String fullName = "Swadeep Kumar Mukherjee";
        int lastSpace = fullName.lastIndexOf(' ');
        String surname = fullName.substring(lastSpace + 1);
        System.out.println("\n[3] Full Name: \"" + fullName + "\"");
        System.out.println("    Surname  : \"" + surname + "\"");

        System.out.println("==================================================");
    }
}