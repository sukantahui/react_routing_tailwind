// declaration_before_use.c – Correct: declaration before call
#include <stdio.h>

// Function prototype (declaration) – appears before main
char calculateGrade(int marks);

int main() {
    int score = 85;
    char grade = calculateGrade(score);
    printf("Score: %d, Grade: %c\n", score, grade);
    return 0;
}

// Function definition
char calculateGrade(int marks) {
    if (marks >= 90) return 'A';
    if (marks >= 75) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
}