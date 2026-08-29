#include <stdio.h>

struct Unpadded {
    char c;
    int i;
    char d;
};

void struct_padding_demo() {
    printf("--- Memory Alignment & Struct Padding Visualizer ---\n");
    printf("Unpadded Struct Size: %lu bytes (3 bytes padding added by compiler for 4-byte CPU alignment).\n", sizeof(struct Unpadded));
}

int main() {
    struct_padding_demo();
    return 0;
}
