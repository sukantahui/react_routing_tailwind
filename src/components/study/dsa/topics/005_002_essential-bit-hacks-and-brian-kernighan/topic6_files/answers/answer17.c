#include <stdio.h>

unsigned int binary_to_gray(unsigned int n) {
    return n ^ (n >> 1);
}

unsigned int gray_to_binary(unsigned int g) {
    unsigned int mask = g >> 1;
    while (mask != 0) {
        g ^= mask;
        mask >>= 1;
    }
    return g;
}

int main() {
    unsigned int num = 10;
    unsigned int gray = binary_to_gray(num);
    unsigned int decoded = gray_to_binary(gray);
    printf("--- Gray Code Encoder and Decoder ---\nOriginal N = %u\nGray Code  = %u\nDecoded N   = %u\n", num, gray, decoded);
    return 0;
}
