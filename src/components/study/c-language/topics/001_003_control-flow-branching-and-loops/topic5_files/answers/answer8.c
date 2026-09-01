/**
 * ============================================================================
 * Project 8: Palindrome Number & String Character Reversal with Digit Peeling
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Number Palindrome Check using Digit Extraction */
bool isNumberPalindrome(long long num) {
    if (num < 0) return false; // Negative numbers are not palindromic (e.g. -121 != 121-)
    long long original = num;
    long long reversed = 0;

    while (num > 0) {
        int rem = num % 10;
        reversed = (reversed * 10) + rem;
        num /= 10;
    }
    return (original == reversed);
}

/* String Palindrome Check using Two-Pointer Loop */
bool isStringPalindrome(const char* str) {
    int len = 0;
    while (str[len] != '\0') len++;

    int left = 0, right = len - 1;
    while (left < right) {
        if (str[left] != str[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main(void) {
    printf("===================================================================\n");
    printf("     PALINDROME VERIFICATION ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    long long testNumbers[] = {12321, 123456, 1000000001LL, 999999, 454};
    int totalNums = sizeof(testNumbers) / sizeof(testNumbers[0]);

    printf("--- [1] Numeric Palindrome Tests ---\n");
    for (int i = 0; i < totalNums; i++) {
        long long val = testNumbers[i];
        printf("Number: %-12lld -> %s\n", val, isNumberPalindrome(val) ? "PALINDROME" : "NOT A PALINDROME");
    }

    const char* testWords[] = {"radar", "level", "barrackpore", "rotator", "computer"};
    int totalWords = sizeof(testWords) / sizeof(testWords[0]);

    printf("\n--- [2] String Palindrome Tests ---\n");
    for (int i = 0; i < totalWords; i++) {
        const char* word = testWords[i];
        printf("Word: %-14s -> %s\n", word, isStringPalindrome(word) ? "PALINDROME" : "NOT A PALINDROME");
    }

    printf("===================================================================\n");
    return 0;
}
