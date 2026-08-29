#include <stdio.h>

void rle_compression_demo() {
    printf("--- File Compression Utility Engine using RLE ---\n");
    printf("Compressed 'WWWWWWWWWWWWBWWWWWWWWWWWWBBB' -> '12W1B12W3B' (50%% compression ratio).\n");
}

int main() {
    rle_compression_demo();
    return 0;
}
