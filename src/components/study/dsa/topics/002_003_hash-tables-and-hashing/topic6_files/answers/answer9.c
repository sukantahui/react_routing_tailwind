#include <stdio.h>

unsigned long djb2_hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) hash = ((hash << 5) + hash) + c; // hash * 33 + c
    return hash;
}

int main() {
    const char *str1 = "ANTIGRAVITY";
    const char *str2 = "DATA_STRUCTURES";
    printf("--- djb2 Polynomial String Hashing ---\n");
    printf("Hash('%s') = %lu\n", str1, djb2_hash(str1));
    printf("Hash('%s') = %lu\n", str2, djb2_hash(str2));
    return 0;
}
