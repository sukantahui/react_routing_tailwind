#include <stdio.h>
#include <string.h>

/**
 * StringHLibraryDemo.c
 * Demonstrates essential standard library functions from <string.h>:
 * strlen, strcpy, strncpy, strcat, strncat, strcmp, strncmp, strchr, and strstr.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    char source[] = "Barrackpore";
    char dest1[50];
    char dest2[50] = "Coder & AccoTax, ";
    char searchTarget[] = "Systems C Programming in Barrackpore, West Bengal";

    printf("====================================================\n");
    printf(" Standard String Library (<string.h>) Functions\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    // 1. strlen() - Length of string (excluding '\0')
    printf("1. strlen(\"%s\") = %zu characters\n\n", source, strlen(source));

    // 2. strcpy() & strncpy() - String copying
    strcpy(dest1, source);
    printf("2. strcpy(dest1, \"%s\") → dest1 = \"%s\"\n", source, dest1);

    char boundedDest[6];
    strncpy(boundedDest, source, 5);
    boundedDest[5] = '\0'; // Ensure null termination
    printf("   strncpy(boundedDest, \"%s\", 5) → boundedDest = \"%s\"\n\n", source, boundedDest);

    // 3. strcat() & strncat() - String concatenation
    strcat(dest2, source);
    printf("3. strcat(dest2, \"%s\") → dest2 = \"%s\"\n\n", source, dest2);

    // 4. strcmp() & strncmp() - Lexicographical comparison
    char s1[] = "Apple";
    char s2[] = "Banana";
    printf("4. strcmp(\"%s\", \"%s\") = %d (%s < %s)\n", s1, s2, strcmp(s1, s2), s1, s2);
    printf("   strcmp(\"%s\", \"%s\") = %d (Identical Strings)\n", s1, s1, strcmp(s1, s1));
    printf("   strncmp(\"Barrack\", \"Barrackpore\", 7) = %d (First 7 chars match!)\n\n", 
           strncmp("Barrack", "Barrackpore", 7));

    // 5. strchr() - Locate first occurrence of character
    char *charPtr = strchr(searchTarget, 'P');
    if (charPtr != NULL) {
        printf("5. strchr('%c') found at offset %td: \"%s\"\n", 'P', charPtr - searchTarget, charPtr);
    }

    // 6. strstr() - Locate substring
    char *subPtr = strstr(searchTarget, "Barrackpore");
    if (subPtr != NULL) {
        printf("6. strstr(\"Barrackpore\") found at offset %td: \"%s\"\n", subPtr - searchTarget, subPtr);
    }

    return 0;
}
