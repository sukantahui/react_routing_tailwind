#include <stdio.h>

int globalCounter = 100;
static int fileStaticCounter = 500;

void testStorageClasses(void) {
    auto int localAuto = 10;
    static int localStatic = 1;
    register int regCounter = 1000;

    localAuto++;
    localStatic++;
    regCounter++;
    globalCounter++;
    fileStaticCounter++;

    printf("  Inside testStorageClasses() Call:\n");
    printf("    • localAuto   (Stack) : %d\n", localAuto);
    printf("    • localStatic (Static): %d\n", localStatic);
    printf("    • regCounter  (Reg)   : %d\n", regCounter);
    printf("    • globalCount (Global): %d\n", globalCounter);
    printf("    • fileStatic  (File)  : %d\n", fileStaticCounter);
}

int main(void) {
    printf("=========================================================\n");
    printf("  MODULAR STORAGE CLASS & STATE COUNTER SIMULATOR        \n");
    printf("=========================================================\n\n");

    printf("FIRST FUNCTION INVOCATION:\n");
    testStorageClasses();

    printf("\nSECOND FUNCTION INVOCATION:\n");
    testStorageClasses();

    printf("\nTHIRD FUNCTION INVOCATION:\n");
    testStorageClasses();

    return 0;
}
