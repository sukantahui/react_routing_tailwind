#include <stdio.h>
#include <string.h>

/**
 * Project 4: Pointer-based String Tokenizer & In-Place Parser
 * Custom re-implementation of strtok_r using double pointers for thread-safe state tracking.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

char *custom_strtok_r(char *str, const char *delims, char **saveptr) {
    char *curr;
    if (str != NULL) {
        curr = str;
    } else {
        if (saveptr == NULL || *saveptr == NULL) return NULL;
        curr = *saveptr;
    }

    // 1. Skip leading delimiters
    while (*curr && strchr(delims, *curr) != NULL) {
        curr++;
    }
    if (*curr == '\0') {
        *saveptr = NULL;
        return NULL;
    }

    char *tokenStart = curr;

    // 2. Find end of token
    while (*curr && strchr(delims, *curr) == NULL) {
        curr++;
    }

    if (*curr != '\0') {
        *curr = '\0';        // Terminate token in-place
        *saveptr = curr + 1; // Save state for next call
    } else {
        *saveptr = NULL;     // Reached end of string
    }

    return tokenStart;
}

int main(void) {
    char logData[] = "2026-09-02;INFO;Barrackpore Center;Student Admissions Opened";
    char *saveState = NULL;

    printf("Input Record: \"%s\"\n\n", logData);
    printf("Parsed Fields via Double Pointer Tokenizer:\n");

    char *token = custom_strtok_r(logData, ";", &saveState);
    int fieldNum = 1;
    while (token != NULL) {
        printf("  Field %d: \"%s\"\n", fieldNum++, token);
        token = custom_strtok_r(NULL, ";", &saveState);
    }

    return 0;
}
