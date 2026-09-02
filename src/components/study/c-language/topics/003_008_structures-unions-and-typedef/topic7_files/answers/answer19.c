/*
 * File: answer19.c
 * Module 003_008 Capstone Project Solution 19
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

#include <stdio.h>
#include <string.h>

struct Record_19 {
    int id;
    char title[50];
    double value;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - PROJECT 19 SOLUTION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Record_19 item = {19, "Structures Project Solution 19", 19 * 150.5};
    printf("Project 19 Executed Successfully! Record ID: %d | Value: INR %.2f\n", item.id, item.value);

    return 0;
}
