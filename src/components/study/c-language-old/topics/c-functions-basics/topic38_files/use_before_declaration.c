// use_before_declaration.c – Error: function used before any declaration
#include <stdio.h>

int main() {
    int score = 85;
    // No prototype or definition seen yet – modern C compiler error
    char grade = calculateGrade(score);  // ERROR: implicit declaration
    printf("Score: %d, Grade: %c\n", score, grade);
    return 0;
}

// Definition appears after use – too late for the compiler
char calculateGrade(int marks) {
    if (marks >= 90) return 'A';
    if (marks >= 75) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
}