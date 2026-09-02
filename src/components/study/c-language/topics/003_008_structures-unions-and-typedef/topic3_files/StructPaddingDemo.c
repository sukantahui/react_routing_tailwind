#include <stdio.h>

struct Unpacked {
    char c1;
    int i;
    char c2;
};

#pragma pack(push, 1)
struct Packed {
    char c1;
    int i;
    char c2;
};
#pragma pack(pop)

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - MEMORY ALIGNMENT & PADDING DEMO\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Standard Padded Struct Size:   %lu bytes (Padding inserted for CPU word alignment)\n", sizeof(struct Unpacked));
    printf("Packed (#pragma pack(1)) Size:  %lu bytes (Zero padding, maximum memory density)\n\n", sizeof(struct Packed));
    float savings = (float)(sizeof(struct Unpacked) - sizeof(struct Packed)) / sizeof(struct Unpacked) * 100.0f;
    printf("Memory Savings Ratio: %.1f%% reduction in RAM overhead!\n", savings);
    return 0;
}