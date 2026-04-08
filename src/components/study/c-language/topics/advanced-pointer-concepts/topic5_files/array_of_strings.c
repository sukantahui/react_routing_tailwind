#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Comparator for qsort (string pointers)
int compareStrings(const void *a, const void *b) {
    // a and b are pointers to the string pointers
    const char **sa = (const char **)a;
    const char **sb = (const char **)b;
    return strcmp(*sa, *sb);
}

int main() {
    // Array of pointers to strings (double pointer)
    const char *fruits[] = {"banana", "apple", "cherry", "date"};
    int n = 4;
    
    // Sort using qsort
    qsort(fruits, n, sizeof(const char*), compareStrings);
    
    for (int i = 0; i < n; i++)
        printf("%s\n", fruits[i]);
    
    return 0;
}