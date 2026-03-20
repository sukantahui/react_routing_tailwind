#include <stdio.h>

int main() {
    // Mistake 1: Taking address of a literal (invalid)
    // int *p = &5;   // error: lvalue required

    // Mistake 2: Using & with an expression
    int a = 10, b = 20;
    // int *p = &(a + b);   // error: lvalue required

    // Mistake 3: Dereferencing uninitialized pointer
    int *wild;           // contains garbage
    // *wild = 100;       // dangerous: undefined behavior

    // Mistake 4: Confusing * in declaration vs dereference
    int x = 5;
    int *ptr = &x;       // * in declaration: ptr is pointer to int
    *ptr = 10;           // * as dereference: changes x
    printf("x = %d\n", x);

    // Mistake 5: Forgetting & in scanf
    int y;
    // scanf("%d", y);    // WRONG: passes value, not address
    scanf("%d", &y);      // CORRECT: passes address of y
    printf("y = %d\n", y);

    return 0;
}