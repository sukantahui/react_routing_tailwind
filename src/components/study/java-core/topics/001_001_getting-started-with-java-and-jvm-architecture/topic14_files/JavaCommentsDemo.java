package topic14_files;

/**
 * The {@code JavaCommentsDemo} class demonstrates the 3 types of comments in Java:
 * <ul>
 *   <li>Single-line comments ({@code //})</li>
 *   <li>Multi-line block comments ({@code /* ... *&#47;})</li>
 *   <li>Javadoc documentation comments ({@code /** ... *&#47;})</li>
 * </ul>
 *
 * @author Sukanta Hui (Coder &amp; AccoTax)
 * @version 1.0
 * @since 2026-08-26
 */
public class JavaCommentsDemo {

    /**
     * Calculates the scholarship award based on student performance.
     *
     * @param score Percentage score earned by the student (0 - 100)
     * @param isDistinction True if student achieved distinction grade
     * @return Total scholarship grant in Indian Rupees (INR)
     * @throws IllegalArgumentException If score is outside the range 0 to 100
     */
    public static double calculateScholarship(int score, boolean isDistinction) {
        // Validation check for score boundary
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Invalid score: " + score);
        }

        /*
         * Business logic for awarding scholarship:
         * Distinction candidates receive an additional 20% bonus grant.
         */
        double grant = score * 150.0;
        if (isDistinction) {
            grant += (grant * 0.20); // 20% distinction bonus
        }

        return grant;
    }

    public static void main(String[] args) {
        System.out.println("=== Java Comments & Javadoc Documentation Architecture ===");
        
        // Single-line comment explaining test invocation
        double reward = calculateScholarship(95, true);
        
        System.out.println("Scholarship for Abhronila (Naihati): Rs." + reward);
    }
}
