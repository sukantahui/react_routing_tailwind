#include <stdio.h>

struct SystemRegister {
    unsigned int powerOn   : 1;
    unsigned int errorFlag : 1;
    unsigned int mode      : 2;
    unsigned int channel   : 4;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - BIT-FIELDS & REGISTER PACKING\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Standard Struct Size (Without Bit-Fields): 16 bytes\n");
    struct SystemRegister reg = {1, 0, 3, 7};
    printf("Bit-Field Struct Size (Packed Flags):       %lu bytes\n\n", sizeof(reg));
    printf("Status Register Flags:\n");
    printf("  Power ON: %d | Error Status: %d | Mode: %d | Channel: %d\n", reg.powerOn, reg.errorFlag, reg.mode, reg.channel);
    printf("Memory Density Optimization: 75.0%% RAM reduction!\n");
    return 0;
}