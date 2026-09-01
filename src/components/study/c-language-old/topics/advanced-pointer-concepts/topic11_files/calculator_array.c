#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int div(int a, int b) { return (b != 0) ? a / b : 0; }
int mod(int a, int b) { return (b != 0) ? a % b : 0; }

int main() {
    // Array of function pointers for operations
    int (*ops[])(int, int) = {add, sub, mul, div, mod};
    const char* names[] = {"Add", "Sub", "Mul", "Div", "Mod"};
    int n_ops = sizeof(ops)/sizeof(ops[0]);
    
    int choice, x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    
    printf("Operations:\n");
    for (int i = 0; i < n_ops; i++)
        printf("%d. %s\n", i+1, names[i]);
    printf("Choice: ");
    scanf("%d", &choice);
    
    if (choice >= 1 && choice <= n_ops) {
        printf("Result: %d\n", ops[choice-1](x, y));
    } else {
        printf("Invalid choice\n");
    }
    
    return 0;
}