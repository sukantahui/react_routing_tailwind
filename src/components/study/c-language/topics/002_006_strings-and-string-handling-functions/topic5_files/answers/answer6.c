#include <stdio.h>
#include <string.h>

/**
 * Project 6: Substring Find and Replace Engine
 * Replaces all occurrences of string 'find' with string 'replace' in text.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void findAndReplace(const char *text, const char *find, const char *replace, char *result) {
    int findLen = strlen(find);
    int replaceLen = strlen(replace);
    const char *p = text;
    char *dest = result;

    while (*p) {
        if (strncmp(p, find, findLen) == 0) {
            strcpy(dest, replace);
            dest += replaceLen;
            p += findLen;
        } else {
            *dest++ = *p++;
        }
    }
    *dest = '\0';
}

int main(void) {
    char original[] = "The student lives in Naihati. The student studies at Barrackpore.";
    char buffer[256];

    findAndReplace(original, "The student", "Swadeep", buffer);

    printf("Original Text :\n  %s\n\n", original);
    printf("Replaced Text :\n  %s\n", buffer);

    return 0;
}
