#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main() {
    // Allocate raw memory
    char *raw = malloc(20);
    if (!raw) return 1;
    
    // Misaligned pointer: address is not multiple of 4 (assuming 4-byte int alignment)
    char *misaligned = raw + 1;
    
    // Cast to int* (dangerous if misaligned)
    int *intPtr = (int*)misaligned;
    
    // On some architectures (ARM, SPARC), this may crash or cause slow access
    *intPtr = 1234;  // potential alignment fault
    
    // Safe way: use memcpy to copy into aligned location
    int safeValue;
    memcpy(&safeValue, misaligned, sizeof(int));
    printf("Safe copy: %d\n", safeValue);
    
    // Another safe method: allocate aligned memory
    // C11 provides aligned_alloc, but for portability, just use memcpy
    
    free(raw);
    return 0;
}