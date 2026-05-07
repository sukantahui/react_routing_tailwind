#include <stdio.h>

#define MAX_BAD(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int i = 1, j = 2;
    int result = MAX_BAD(i++, j++);
    // Expands to ((i++) > (j++) ? (i++) : (j++))
    // i and j incremented twice!
    printf("i=%d, j=%d, result=%d\n", i, j, result);
    // Typical output: i=2, j=4, result=3 (the value of j++ after first evaluation)
    // Undefined behavior (sequence point violation)
    
    // Safe version: use inline function
    return 0;
}