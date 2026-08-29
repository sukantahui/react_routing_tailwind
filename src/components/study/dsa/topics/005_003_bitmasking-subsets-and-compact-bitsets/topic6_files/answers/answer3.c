#include <stdio.h>

void bitwise_set_operations_demo(int setA, int setB) {
    printf("--- Set Operations via Bitwise Ops ---\nSet A = %d, Set B = %d\n", setA, setB);
    printf("Union (A | B)        = %d\n", setA | setB);
    printf("Intersection (A & B) = %d\n", setA & setB);
    printf("Difference (A & ~B)  = %d\n", setA & ~setB);
    printf("Symmetric Diff (A^B) = %d\n", setA ^ setB);
}

int main() {
    bitwise_set_operations_demo(5, 3); // A = 101, B = 011
    return 0;
}
