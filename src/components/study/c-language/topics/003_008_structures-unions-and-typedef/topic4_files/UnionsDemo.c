#include <stdio.h>

union DataPayload {
    int intVal;
    float floatVal;
    char bytes[4];
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - C UNIONS & MEMORY OVERLAY DEMO\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    union DataPayload payload;
    printf("Union Size: %lu bytes (Shares memory across int, float, and char[4])\n\n", sizeof(payload));

    payload.intVal = 1065353216;
    printf("Setting Integer Value:  %d\n", payload.intVal);
    printf("Active Float View (Type Punning): %f\n\n", payload.floatVal);

    payload.floatVal = 3.141593f;
    printf("Setting Float Value:    %f\n", payload.floatVal);
    printf("Raw Hex Representation: 0x%X\n", payload.intVal);
    return 0;
}