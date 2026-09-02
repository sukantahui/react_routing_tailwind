#include <stdio.h>
#include <stddef.h> // For ptrdiff_t

/**
 * PointerArithmeticDemo.c
 * Demonstrates pointer arithmetic: automatic scaling by sizeof(T),
 * pointer increment/decrement (ptr++, ptr--), pointer addition/subtraction,
 * pointer distance calculation (ptrdiff_t), and pointer relational comparisons.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int intArr[5] = {10, 20, 30, 40, 50};
    double dblArr[3] = {1.1, 2.2, 3.3};
    char charArr[4] = {'A', 'B', 'C', 'D'};

    int *pInt = intArr;       // Points to intArr[0]
    double *pDbl = dblArr;    // Points to dblArr[0]
    char *pChar = charArr;    // Points to charArr[0]

    printf("====================================================\n");
    printf(" Pointer Arithmetic & Automatic Type Scaling\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Pointer Scaling Proof (Advancing by 1 Step):\n");
    printf("   • pChar = %p | pChar + 1 = %p (Diff: %td Byte - sizeof(char))\n", 
           (void*)pChar, (void*)(pChar + 1), (char*)(pChar + 1) - (char*)pChar);
    printf("   • pInt  = %p | pInt + 1  = %p (Diff: %td Bytes - sizeof(int))\n", 
           (void*)pInt, (void*)(pInt + 1), (char*)(pInt + 1) - (char*)pInt);
    printf("   • pDbl  = %p | pDbl + 1  = %p (Diff: %td Bytes - sizeof(double))\n\n", 
           (void*)pDbl, (void*)(pDbl + 1), (char*)(pDbl + 1) - (char*)pDbl);

    printf("2. Array Traversal via Pointer Increment (*ptr++):\n   Values: [ ");
    int *ptr = intArr;
    for (int i = 0; i < 5; i++) {
        printf("%d ", *ptr++);
    }
    printf("]\n\n");

    printf("3. Pointer Subtraction & Distance (ptrdiff_t):\n");
    int *pStart = &intArr[0];
    int *pEnd = &intArr[4];
    ptrdiff_t distance = pEnd - pStart;
    printf("   • pStart = %p (intArr[0])\n", (void*)pStart);
    printf("   • pEnd   = %p (intArr[4])\n", (void*)pEnd);
    printf("   • Element Distance (pEnd - pStart) = %td elements apart!\n\n", distance);

    printf("4. Pointer Relational Comparisons (p1 < p2):\n");
    if (pStart < pEnd) {
        printf("   ✓ pStart (< %p) appears earlier in memory than pEnd (%p).\n", 
               (void*)pStart, (void*)pEnd);
    }

    return 0;
}
