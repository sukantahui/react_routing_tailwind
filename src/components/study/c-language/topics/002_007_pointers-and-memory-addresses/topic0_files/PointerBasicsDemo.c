#include <stdio.h>

/**
 * PointerBasicsDemo.c
 * Demonstrates pointer fundamentals: memory addresses, address-of operator (&),
 * dereference operator (*), pointer sizing (8 bytes on 64-bit), and NULL pointer safety.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int age = 22;
    double salary = 45000.50;
    char grade = 'A';

    // 1. Pointer declarations and address assignment
    int *pAge = &age;
    double *pSalary = &salary;
    char *pGrade = &grade;

    // 2. NULL pointer declaration
    int *pNull = NULL;

    printf("====================================================\n");
    printf(" Pointer Fundamentals & Physical Memory Addresses\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Variable Values & Their Memory Addresses in RAM:\n");
    printf("   • int age       = %d | Address (&age)     = %p (Size: %zu B)\n", 
           age, (void*)&age, sizeof(age));
    printf("   • double salary = %.2f | Address (&salary)  = %p (Size: %zu B)\n", 
           salary, (void*)&salary, sizeof(salary));
    printf("   • char grade    = '%c' | Address (&grade)   = %p (Size: %zu B)\n\n", 
           grade, (void*)&grade, sizeof(grade));

    printf("2. Pointer Variables (Storing Addresses):\n");
    printf("   • pAge    stores %p | sizeof(pAge)    = %zu Bytes\n", (void*)pAge, sizeof(pAge));
    printf("   • pSalary stores %p | sizeof(pSalary) = %zu Bytes\n", (void*)pSalary, sizeof(pSalary));
    printf("   • pGrade  stores %p | sizeof(pGrade)  = %zu Bytes\n\n", (void*)pGrade, sizeof(pGrade));

    printf("3. Dereferencing Operator (*) - Reading & Writing Value via Pointer:\n");
    printf("   • Value via *pAge    = %d\n", *pAge);
    printf("   • Modifying value through pointer: *pAge = 25;\n");
    *pAge = 25; // Modifying original variable through pointer!
    printf("   • New value of 'age' = %d (Directly mutated in RAM!)\n\n", age);

    printf("4. NULL Pointer Guard Validation:\n");
    if (pNull == NULL) {
        printf("   ✓ pNull is NULL (Points to address 0x0 / (nil)). Safely guarded against crash!\n");
    }

    return 0;
}
