/**
 * ============================================================================
 * Project 7: Recursive Palindrome & String Symmetry Verifier
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

bool isPalindromeRecursive(const char *str, int left, int right) {
    /* Base Case: pointers meet or cross */
    if (left >= right) return true;

    /* If boundary characters don't match, not a palindrome */
    if (str[left] != str[right]) return false;

    /* Recursive Step on inner substring */
    return isPalindromeRecursive(str, left + 1, right - 1);
}

bool checkStringPalindrome(const char *str) {
    if (str == NULL) return false;
    int len = 0;
    while (str[len] != '\0') len++;
    return isPalindromeRecursive(str, 0, len - 1);
}

int main(void) {
    printf("===================================================================\n");
    printf("     RECURSIVE STRING PALINDROME VERIFIER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    const char *words[] = {"radar", "level", "barrackpore", "rotator", "computer", "madam"};
    int count = sizeof(words) / sizeof(words[0]);

    for (int i = 0; i < count; i++) {
        const char *w = words[i];
        bool isPal = checkStringPalindrome(w);
        printf("Word: %-15s -> %s\n", w, isPal ? "[PALINDROME]" : "[NOT PALINDROME]");
    }

    printf("\n===================================================================\n");
    return 0;
}
