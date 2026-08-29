/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Pattern Matching Masterclass: KMP (LPS Array) & Rabin-Karp Rolling Hash
 * File: PatternMatchingDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define ALPHABET_BASE 256
#define PRIME_MODULO 1000000007

// ============================================================================
// 1. KNUTH-MORRIS-PRATT (KMP) ALGORITHM
// ============================================================================

// Compute Longest Prefix Suffix (LPS / pi-table) array
void computeLPSArray(const char* pattern, int m, int lps[]) {
    int len = 0; // Length of the previous longest prefix suffix
    lps[0] = 0;  // lps[0] is always 0
    int i = 1;

    while (i < m) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                // Fall back to previous matching prefix boundary without incrementing i
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

// KMP Search: Finds all occurrences of pattern in text in O(N + M) time
void KMPSearch(const char* text, const char* pattern) {
    int n = (int)strlen(text);
    int m = (int)strlen(pattern);
    if (m == 0 || n < m) return;

    int* lps = (int*)malloc(m * sizeof(int));
    if (!lps) return;

    computeLPSArray(pattern, m, lps);

    printf("   KMP LPS (pi-table) for \"%s\": [", pattern);
    for (int k = 0; k < m; k++) printf("%d%s", lps[k], k == m - 1 ? "" : ", ");
    printf("]\n");

    int i = 0; // Text index (NEVER backtracks!)
    int j = 0; // Pattern index
    int matchCount = 0;

    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }

        if (j == m) {
            printf("   -> KMP Match Found at Index %d in text!\n", i - j);
            matchCount++;
            j = lps[j - 1]; // Reset pattern index using LPS table
        } else if (i < n && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1]; // Jump pattern index without moving text pointer i
            } else {
                i++;
            }
        }
    }

    if (matchCount == 0) {
        printf("   No matches found using KMP.\n");
    }

    free(lps);
}

// ============================================================================
// 2. RABIN-KARP ROLLING HASH ALGORITHM
// ============================================================================

void RabinKarpSearch(const char* text, const char* pattern) {
    int n = (int)strlen(text);
    int m = (int)strlen(pattern);
    if (m == 0 || n < m) return;

    long long patternHash = 0;
    long long windowHash = 0;
    long long h = 1; // Base^(m-1) % PRIME_MODULO

    // Compute h = (ALPHABET_BASE^(m-1)) % PRIME_MODULO
    for (int i = 0; i < m - 1; i++) {
        h = (h * ALPHABET_BASE) % PRIME_MODULO;
    }

    // Calculate initial hash value for pattern and first text window
    for (int i = 0; i < m; i++) {
        patternHash = (patternHash * ALPHABET_BASE + (unsigned char)pattern[i]) % PRIME_MODULO;
        windowHash = (windowHash * ALPHABET_BASE + (unsigned char)text[i]) % PRIME_MODULO;
    }

    int matchCount = 0;

    for (int i = 0; i <= n - m; i++) {
        // If hash values match, verify character-by-character to eliminate spurious collisions
        if (patternHash == windowHash) {
            bool exactMatch = true;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) {
                    exactMatch = false;
                    break;
                }
            }
            if (exactMatch) {
                printf("   -> Rabin-Karp Match Found at Index %d! (Hash: %lld)\n", i, patternHash);
                matchCount++;
            }
        }

        // Compute rolling hash for next window in O(1)
        if (i < n - m) {
            windowHash = (ALPHABET_BASE * (windowHash - ((unsigned char)text[i] * h) % PRIME_MODULO) + (unsigned char)text[i + m]) % PRIME_MODULO;
            // Handle negative modulo in C
            if (windowHash < 0) {
                windowHash += PRIME_MODULO;
            }
        }
    }

    if (matchCount == 0) {
        printf("   No matches found using Rabin-Karp.\n");
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("   CODER & ACCOTAX - KMP & RABIN-KARP PATTERN MATCHING DEMO      \n");
    printf("   Mentor: Sukanta Hui · Barrackpore Lab Demonstration           \n");
    printf("=================================================================\n\n");

    const char* text = "ABABDABACDABABCABAB";
    const char* pattern = "ABABCABAB";

    printf("Target Text:    \"%s\"\n", text);
    printf("Target Pattern: \"%s\"\n\n", pattern);

    printf("1. Running Knuth-Morris-Pratt (KMP) Algorithm:\n");
    KMPSearch(text, pattern);
    printf("\n");

    printf("2. Running Rabin-Karp Rolling Hash Algorithm:\n");
    RabinKarpSearch(text, pattern);
    printf("\n");

    return 0;
}
