// SuperConstructorExample.java
// Demonstrates using 'super()' to call parent class constructors

class Book {
    String bookId;
    String title;
    String author;
    
    // No-argument constructor
    Book() {
        this.bookId = "UNKNOWN";
        this.title = "Untitled";
        this.author = "Unknown Author";
        System.out.println("Book() no-arg constructor called");
    }
    
    // Parameterized constructor 1
    Book(String bookId, String title) {
        this.bookId = bookId;
        this.title = title;
        this.author = "Unknown Author";
        System.out.println("Book(bookId, title) constructor called");
    }
    
    // Parameterized constructor 2
    Book(String bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        System.out.println("Book(bookId, title, author) constructor called");
    }
    
    void displayInfo() {
        System.out.println("Book ID: " + bookId + ", Title: " + title + ", Author: " + author);
    }
}

class LibraryBook extends Book {
    String libraryCode;
    boolean isAvailable;
    
    // Constructor 1: Calls parent's no-arg constructor automatically
    LibraryBook() {
        // super() is automatically inserted by Java
        this.libraryCode = "LIB-DEFAULT";
        this.isAvailable = true;
        System.out.println("LibraryBook() constructor called");
    }
    
    // Constructor 2: Explicitly calling parent's parameterized constructor
    LibraryBook(String bookId, String title, String libraryCode) {
        super(bookId, title);  // Explicit call to parent's 2-parameter constructor
        this.libraryCode = libraryCode;
        this.isAvailable = true;
        System.out.println("LibraryBook(bookId, title, libraryCode) constructor called");
    }
    
    // Constructor 3: Calling parent's 3-parameter constructor
    LibraryBook(String bookId, String title, String author, String libraryCode, boolean isAvailable) {
        super(bookId, title, author);  // Call parent's 3-parameter constructor
        this.libraryCode = libraryCode;
        this.isAvailable = isAvailable;
        System.out.println("LibraryBook(bookId, title, author, libraryCode, isAvailable) constructor called");
    }
    
    @Override
    void displayInfo() {
        super.displayInfo();  // Reuse parent's display logic
        System.out.println("Library Code: " + libraryCode + ", Available: " + isAvailable);
    }
}

public class SuperConstructorExample {
    public static void main(String[] args) {
        System.out.println("=== super() Constructor Chaining Demo ===\n");
        
        System.out.println("--- Creating LibraryBook with default constructor ---");
        LibraryBook book1 = new LibraryBook();
        book1.displayInfo();
        
        System.out.println("\n--- Creating LibraryBook with 3 parameters ---");
        LibraryBook book2 = new LibraryBook("BK001", "Java Programming", "LIB-JAVA-01");
        book2.displayInfo();
        
        System.out.println("\n--- Creating LibraryBook with 5 parameters ---");
        LibraryBook book3 = new LibraryBook("BK002", "Data Structures", "Robert Lafore", "LIB-DSA-02", true);
        book3.displayInfo();
    }
}

/* EXPECTED OUTPUT:
=== super() Constructor Chaining Demo ===

--- Creating LibraryBook with default constructor ---
Book() no-arg constructor called
LibraryBook() constructor called
Book ID: UNKNOWN, Title: Untitled, Author: Unknown Author
Library Code: LIB-DEFAULT, Available: true

--- Creating LibraryBook with 3 parameters ---
Book(bookId, title) constructor called
LibraryBook(bookId, title, libraryCode) constructor called
Book ID: BK001, Title: Java Programming, Author: Unknown Author
Library Code: LIB-JAVA-01, Available: true

--- Creating LibraryBook with 5 parameters ---
Book(bookId, title, author) constructor called
LibraryBook(bookId, title, author, libraryCode, isAvailable) constructor called
Book ID: BK002, Title: Data Structures, Author: Robert Lafore
Library Code: LIB-DSA-02, Available: true
*/