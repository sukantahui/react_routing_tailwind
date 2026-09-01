#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int div(int a, int b) { return (b != 0) ? a / b : 0; }

int main() {
    // Array of function pointers (jump table)
    int (*operations[4])(int, int) = {add, sub, mul, div};
    int choice, x, y;
    
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("0=add 1=sub 2=mul 3=div: ");
    scanf("%d", &choice);
    
    if (choice >= 0 && choice < 4) {
        int result = operations[choice](x, y);
        printf("Result: %d\n", result);
    } else {
        printf("Invalid choice\n");
    }
    return 0;
}