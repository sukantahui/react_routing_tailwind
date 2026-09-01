#include <stdio.h>
#include <string.h>

// Function to demonstrate double pointer with strings
void printAllArguments(int argc, char **argv) {
    printf("\n=== Command Line Arguments ===\n");
    printf("Number of arguments: %d\n\n", argc);
    
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s (address: %p)\n", i, argv[i], argv[i]);
    }
}

// Function to find a specific argument
int findArgument(int argc, char **argv, const char *target) {
    for (int i = 0; i < argc; i++) {
        if (strcmp(argv[i], target) == 0) {
            return i;
        }
    }
    return -1;
}

// Simulate command line arguments for demonstration
int main() {
    // Simulate command line arguments
    char *simulated_argv[] = {
        "./program",
        "-v",
        "--verbose",
        "filename.txt",
        "100"
    };
    int simulated_argc = 5;
    
    printf("=== Double Pointers as argv ===\n");
    printf("argv is a double pointer (char**)\n");
    printf("Each argv[i] is a pointer to a string\n\n");
    
    // Pass double pointer to function
    printAllArguments(simulated_argc, simulated_argv);
    
    // Find specific argument
    int pos = findArgument(simulated_argc, simulated_argv, "--verbose");
    if (pos != -1) {
        printf("\nFound '--verbose' at position %d\n", pos);
    }
    
    // Demonstrate pointer arithmetic with argv
    printf("\n=== Pointer Arithmetic with argv ===\n");
    char **ptr = simulated_argv;
    printf("ptr points to: %s\n", *ptr);
    ptr++;  // Move to next argument
    printf("After ptr++: %s\n", *ptr);
    ptr++;
    printf("After ptr++: %s\n", *ptr);
    
    return 0;
}