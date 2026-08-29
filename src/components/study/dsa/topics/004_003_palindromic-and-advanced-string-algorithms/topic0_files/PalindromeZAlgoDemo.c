/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Palindromic & Advanced String Algorithms: Manacher's Algorithm & Z-Array
 * File: PalindromeZAlgoDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ============================================================================
// 1. MANACHER'S LINEAR O(N) LONGEST PALINDROMIC SUBSTRING ALGORITHM
// ============================================================================

// Transform string "aba" into "^#a#b#a#$" to unify odd/even palindrome handling
char* preProcess(const char* s, int* newLen) {
    int n = (int)strlen(s);
    if (n == 0) {
        *newLen = 3;
        char* empty = (char*)malloc(3);
        strcpy(empty, "^$");
        return empty;
    }

    *newLen = 2 * n + 3;
    char* transformed = (char*)malloc(*newLen);
    if (!transformed) return NULL;

    transformed[0] = '^'; // Start sentinel
    int idx = 1;
    for (int i = 0; i < n; i++) {
        transformed[idx++] = '#';
        transformed[idx++] = s[i];
    }
    transformed[idx++] = '#';
    transformed[idx++] = '$'; // End sentinel
    transformed[idx] = '\0';

    return transformed;
}

// Manacher's Algorithm in C
char* longestPalindromicSubstring(const char* s) {
    int n = (int)strlen(s);
    if (n <= 1) {
        char* res = (char*)malloc(n + 1);
        strcpy(res, s);
        return res;
    }

    int tLen = 0;
    char* T = preProcess(s, &tLen);
    int* P = (int*)calloc(tLen, sizeof(int)); // Palindrome radius array

    int center = 0; // Center of current rightmost palindrome
    int right = 0;  // Right boundary of current rightmost palindrome

    int maxLen = 0;
    int centerIndex = 0;

    for (int i = 1; i < tLen - 1; i++) {
        int iMirror = 2 * center - i; // Symmetric mirror of i around center

        if (right > i) {
            // Utilize symmetry: P[i] is at least min(right - i, P[iMirror])
            P[i] = (right - i < P[iMirror]) ? (right - i) : P[iMirror];
        } else {
            P[i] = 0;
        }

        // Expand palindrome around i while sentinels prevent out-of-bounds
        while (T[i + 1 + P[i]] == T[i - 1 - P[i]]) {
            P[i]++;
        }

        // If expanded past right boundary, adjust center and right
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }

        // Track maximum palindrome radius found
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }

    // Extract the original substring
    int start = (centerIndex - 1 - maxLen) / 2;
    char* result = (char*)malloc(maxLen + 1);
    strncpy(result, s + start, maxLen);
    result[maxLen] = '\0';

    free(T);
    free(P);

    return result;
}

// ============================================================================
// 2. Z-ALGORITHM (Z-ARRAY PATTERN MATCHING)
// ============================================================================

// Compute Z-Array: Z[i] is length of longest common prefix between s and s[i..end]
void computeZArray(const char* s, int n, int Z[]) {
    int L = 0, R = 0;
    Z[0] = n;

    for (int i = 1; i < n; i++) {
        if (i > R) {
            L = R = i;
            while (R < n && s[R - L] == s[R]) {
                R++;
            }
            Z[i] = R - L;
            R--;
        } else {
            int k = i - L;
            if (Z[k] < R - i + 1) {
                Z[i] = Z[k];
            } else {
                L = i;
                while (R < n && s[R - L] == s[R]) {
                    R++;
                }
                Z[i] = R - L;
                R--;
            }
        }
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("   CODER & ACCOTAX - MANACHER'S & Z-ALGORITHM STRING DEMO        \n");
    printf("   Mentor: Sukanta Hui · Barrackpore Lab Demonstration           \n");
    printf("=================================================================\n\n");

    // 1. Manacher's Algorithm
    const char* palindromeStr = "babadbarrackporeeropkcarrabxyz";
    printf("1. Longest Palindromic Substring via Manacher's Algorithm:\n");
    printf("   Input String: \"%s\"\n", palindromeStr);

    char* lps = longestPalindromicSubstring(palindromeStr);
    printf("   -> Longest Palindrome: \"%s\" (Length: %zu, Computed in O(N) time)\n\n", lps, strlen(lps));
    free(lps);

    // 2. Z-Algorithm
    const char* zText = "aabxaabxcaabxaabxay";
    int zLen = (int)strlen(zText);
    int* Z = (int*)malloc(zLen * sizeof(int));

    computeZArray(zText, zLen, Z);

    printf("2. Z-Algorithm Longest Common Prefix Array:\n");
    printf("   Input String: \"%s\"\n", zText);
    printf("   Z-Array: [");
    for (int i = 0; i < zLen; i++) {
        printf("%d%s", Z[i], i == zLen - 1 ? "" : ", ");
    }
    printf("]\n");

    free(Z);
    return 0;
}
