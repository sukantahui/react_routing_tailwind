#include <stdio.h>
#include <stdlib.h>

/**
 * ProgramStructureDemo.c
 * Anatomy of a Standard C Program:
 * - Preprocessor Directives (#include, #define)
 * - Global Function Prototypes
 * - Main Entry Point Function (int main(void))
 * - Variable Declarations & Scope Blocks
 * - Custom Function Definitions & Return Exit Codes
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#define ACADEMY_NAME "Coder & AccoTax Learning Center"
#define LOCATION "Barrackpore, West Bengal"

// Global Function Prototypes
void printHeaderBanner(const char *courseName);
int processStudentStatus(int rollNumber, float score);

int main(void) {
    // Local Variables inside main()
    int studentRoll = 101;
    float studentScore = 88.5f;
    int exitStatus;

    // Call custom header display function
    printHeaderBanner("C Programming & Systems Fundamentals");

    printf("[Execution State] Inside main() entry point function.\n");
    printf("Processing Student Roll: %d with Score: %.2f...\n\n", studentRoll, studentScore);

    // Call helper processing function
    exitStatus = processStudentStatus(studentRoll, studentScore);

    printf("[Execution State] Returning from main() with exit code %d.\n", exitStatus);
    return exitStatus; // 0 = EXIT_SUCCESS
}

void printHeaderBanner(const char *courseName) {
    printf("====================================================\n");
    printf(" %s\n", ACADEMY_NAME);
    printf(" Location: %s | Educator: Sukanta Hui\n", LOCATION);
    printf(" Course  : %s\n", courseName);
    printf("====================================================\n\n");
}

int processStudentStatus(int rollNumber, float score) {
    printf("--> [processStudentStatus] Roll %d Scored %.2f marks.\n", rollNumber, score);
    if (score >= 40.0f) {
        printf("--> Result: PASSED (Grade A)\n");
        return EXIT_SUCCESS; // 0
    } else {
        printf("--> Result: NEEDS IMPROVEMENT\n");
        return EXIT_FAILURE; // 1
    }
}
