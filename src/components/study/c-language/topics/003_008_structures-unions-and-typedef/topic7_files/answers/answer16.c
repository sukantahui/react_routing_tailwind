/*
 * File: answer16.c
 * Module 003_008 Capstone Project Solution 16
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

#include <stdio.h>
#include <string.h>

struct Record_16 {
    int id;
    char title[50];
    double value;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - PROJECT 16 SOLUTION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Record_16 item = {16, "Structures Project Solution 16", 16 * 150.5};
    printf("Project 16 Executed Successfully! Record ID: %d | Value: INR %.2f\n", item.id, item.value);

    return 0;
}
