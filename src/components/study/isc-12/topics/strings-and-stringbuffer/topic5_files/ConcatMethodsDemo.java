// topic5_files/ConcatMethodsDemo.java
public class ConcatMethodsDemo {
    public static void main(String[] args) {
        String firstName = "Swadeep";
        String lastName = "Mukherjee";
        String city = "Barrackpore";
        
        // Method 1: + operator (most common)
        String result1 = firstName + " " + lastName + " from " + city;
        System.out.println("+ operator: " + result1);
        
        // Method 2: concat() method
        String result2 = firstName.concat(" ").concat(lastName).concat(" from ").concat(city);
        System.out.println("concat(): " + result2);
        
        // Method 3: StringBuilder
        StringBuilder sb = new StringBuilder();
        sb.append(firstName).append(" ").append(lastName).append(" from ").append(city);
        String result3 = sb.toString();
        System.out.println("StringBuilder: " + result3);
        
        // Method 4: String.join (Java 8+)
        String result4 = String.join(" ", firstName, lastName, "from", city);
        System.out.println("String.join(): " + result4);
        
        // Method 5: String.format
        String result5 = String.format("%s %s from %s", firstName, lastName, city);
        System.out.println("String.format(): " + result5);
        
        // Bonus: mixing types
        int age = 20;
        String info = "Name: " + firstName + ", Age: " + age;
        System.out.println("Mixed types: " + info);
    }
}