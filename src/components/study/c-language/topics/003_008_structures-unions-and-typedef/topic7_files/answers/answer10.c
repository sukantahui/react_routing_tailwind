/*
 * File: answer10.c
 * Module 003_008 Capstone Project Solution 10
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

#include <stdio.h>
#include <string.h>

struct Record_10 {
    int id;
    char title[50];
    double value;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - PROJECT 10 SOLUTION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Record_10 item = {10, "Structures Project Solution 10", 10 * 150.5};
    printf("Project 10 Executed Successfully! Record ID: %d | Value: INR %.2f\n", item.id, item.value);

    return 0;
}
