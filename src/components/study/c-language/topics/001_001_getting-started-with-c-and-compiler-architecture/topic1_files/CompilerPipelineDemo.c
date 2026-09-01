#include <stdio.h>

/**
 * CompilerPipelineDemo.c
 * Formatted I/O & System Info Utility in C
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int rollNumber;
    float marks;

    printf("======================================\n");
    printf(" Coder & AccoTax Student Portal\n");
    printf(" Location: Barrackpore, West Bengal\n");
    printf("======================================\n\n");

    printf("Enter Student Roll Number: ");
    if (scanf("%d", &rollNumber) != 1) {
        printf("Invalid roll number input.\n");
        return 1;
    }

    printf("Enter Total Marks: ");
    if (scanf("%f", &marks) != 1) {
        printf("Invalid marks input.\n");
        return 1;
    }

    printf("\n--- Student Summary Report ---\n");
    printf("Roll Number : %d\n", rollNumber);
    printf("Marks Scored: %.2f / 100.00\n", marks);
    printf("Status      : ");
    if (marks >= 40.0f) {
        printf("PASSED [GOOD JOB]\n");
    } else {
        printf("NEEDS IMPROVEMENT\n");
    }

    return 0;
}
