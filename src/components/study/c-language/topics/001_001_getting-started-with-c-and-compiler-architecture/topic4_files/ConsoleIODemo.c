#include <stdio.h>

/**
 * ConsoleIODemo.c
 * Formatted I/O with printf, scanf, and format specifiers
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int age;
    float gpa;
    char grade;

    printf("=== Formatted Console I/O Demo ===\n\n");

    printf("Enter Age (integer): ");
    scanf("%d", &age);

    printf("Enter GPA (float): ");
    scanf("%f", &gpa);

    printf("Enter Grade (char): ");
    scanf(" %c", &grade); // Leading space consumes leftover newline

    printf("\n--- Summary ---\n");
    printf("Age  : %d years\n", age);
    printf("GPA  : %.2f / 4.00\n", gpa);
    printf("Grade: %c\n", grade);

    return 0;
}
