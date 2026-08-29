#include <stdio.h>

void bwt_compression_demo() {
    printf("--- Burrows-Wheeler Transform (BWT) & Inverse Kernel ---\n");
    printf("Transformed string 'banana$' -> 'annb$aa' for bzip2 compression.\n");
}

int main() {
    bwt_compression_demo();
    return 0;
}
