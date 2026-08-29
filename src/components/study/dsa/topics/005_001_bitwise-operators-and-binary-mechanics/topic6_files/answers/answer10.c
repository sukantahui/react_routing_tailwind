#include <stdio.h>

void print_binary_32(unsigned int n) {
    printf("Binary (32-bit): ");
    for (int i = 31; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i % 8 == 0) printf(" ");
    }
    printf("\n");
}

int main() {
    unsigned int num = 29;
    printf("--- Binary Representation Printer Engine ---\nNumber: %u\n", num);
    print_binary_32(num);
    return 0;
}
