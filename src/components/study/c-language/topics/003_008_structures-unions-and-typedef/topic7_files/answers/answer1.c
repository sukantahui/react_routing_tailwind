/*
 * File: answer1.c
 * Module 003_008 Capstone Project Solution 1
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

#include <stdio.h>
#include <string.h>

struct Record_1 {
    int id;
    char title[50];
    double value;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - PROJECT 1 SOLUTION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Record_1 item = {1, "Structures Project Solution 1", 1 * 150.5};
    printf("Project 1 Executed Successfully! Record ID: %d | Value: INR %.2f\n", item.id, item.value);

    return 0;
}
