// TemplateMethodPattern.java
// Classic use of abstract class inheritance: Template Method pattern

abstract class DataProcessor {
    // Template method - defines algorithm skeleton
    // Made final to prevent subclasses from changing the algorithm structure
    public final void process() {
        loadData();
        processData();
        saveData();
        if (needsValidation()) {
            validate();
        }
        cleanup();
    }
    
    // Abstract methods - steps that subclasses must implement
    protected abstract void loadData();
    protected abstract void processData();
    protected abstract void saveData();
    
    // Hook method - optional override (default implementation)
    protected boolean needsValidation() {
        return false; // default: no validation
    }
    
    protected void validate() {
        System.out.println("Performing default validation");
    }
    
    // Concrete method - same for all
    private void cleanup() {
        System.out.println("Cleaning up resources");
    }
}

// Concrete implementation for CSV processing
class CSVProcessor extends DataProcessor {
    private String filename;
    
    public CSVProcessor(String filename) {
        this.filename = filename;
    }
    
    @Override
    protected void loadData() {
        System.out.println("Loading CSV file: " + filename);
    }
    
    @Override
    protected void processData() {
        System.out.println("Parsing CSV rows, converting to objects");
    }
    
    @Override
    protected void saveData() {
        System.out.println("Saving processed CSV data to database");
    }
    
    @Override
    protected boolean needsValidation() {
        return true; // CSV needs validation
    }
    
    @Override
    protected void validate() {
        System.out.println("Validating CSV format and data types");
    }
}

// Concrete implementation for JSON processing
class JSONProcessor extends DataProcessor {
    private String apiEndpoint;
    
    public JSONProcessor(String apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }
    
    @Override
    protected void loadData() {
        System.out.println("Fetching JSON from API: " + apiEndpoint);
    }
    
    @Override
    protected void processData() {
        System.out.println("Deserializing JSON to Java objects");
    }
    
    @Override
    protected void saveData() {
        System.out.println("Storing processed JSON data");
    }
    
    // Uses default needsValidation() = false
}

// Another example: Game loop template
abstract class Game {
    // Template method - the game loop
    public final void play() {
        initialize();
        while (!isGameOver()) {
            takeTurn();
            updateDisplay();
        }
        showGameOver();
        cleanup();
    }
    
    protected abstract void initialize();
    protected abstract void takeTurn();
    protected abstract void updateDisplay();
    protected abstract boolean isGameOver();
    protected abstract void showGameOver();
    
    protected void cleanup() {
        System.out.println("Game cleanup complete");
    }
}

class ChessGame extends Game {
    private int moves = 0;
    private boolean gameOver = false;
    
    @Override
    protected void initialize() {
        System.out.println("Initializing chess board, placing pieces");
    }
    
    @Override
    protected void takeTurn() {
        moves++;
        System.out.println("Turn " + moves + ": Player moves a piece");
        if (moves >= 5) gameOver = true; // demo condition
    }
    
    @Override
    protected void updateDisplay() {
        System.out.println("Displaying chess board (updated)");
    }
    
    @Override
    protected boolean isGameOver() {
        return gameOver;
    }
    
    @Override
    protected void showGameOver() {
        System.out.println("Checkmate! Game over after " + moves + " moves.");
    }
}

public class TemplateMethodPattern {
    public static void main(String[] args) {
        System.out.println("=== Template Method Pattern Demo ===\n");
        
        System.out.println("--- CSV Processor ---");
        DataProcessor csvProcessor = new CSVProcessor("data.csv");
        csvProcessor.process();
        
        System.out.println("\n--- JSON Processor ---");
        DataProcessor jsonProcessor = new JSONProcessor("https://api.example.com/data");
        jsonProcessor.process();
        
        System.out.println("\n--- Chess Game ---");
        Game chess = new ChessGame();
        chess.play();
        
        System.out.println("\n=== Key Insight ===");
        System.out.println("The abstract class defines the algorithm structure (template method)");
        System.out.println("Subclasses provide specific implementations for each step.");
        System.out.println("This promotes code reuse and enforces consistency.");
    }
}