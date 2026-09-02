/*
 * File: answer14.c
 * Module 003_008 Capstone Project Solution 14
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

#include <stdio.h>
#include <string.h>

struct Record_14 {
    int id;
    char title[50];
    double value;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - PROJECT 14 SOLUTION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Record_14 item = {14, "Structures Project Solution 14", 14 * 150.5};
    printf("Project 14 Executed Successfully! Record ID: %d | Value: INR %.2f\n", item.id, item.value);

    return 0;
}
