#include <stdio.h>

/**
 * Project 10: Arithmetic Expression Evaluator using Operator Dispatch Table
 * Evaluates binary math expressions dynamically using a function pointer dispatch table.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int opAdd(int a, int b) { return a + b; }
int opSub(int a, int b) { return a - b; }
int opMul(int a, int b) { return a * b; }
int opDiv(int a, int b) { return (b != 0) ? a / b : 0; }
int opMod(int a, int b) { return (b != 0) ? a % b : 0; }

typedef int (*BinaryOpHandler)(int, int);

typedef struct {
    char symbol;
    BinaryOpHandler handler;
} OperatorEntry;

int evaluate(int left, char op, int right) {
    OperatorEntry table[] = {
        {'+', opAdd},
        {'-', opSub},
        {'*', opMul},
        {'/', opDiv},
        {'%', opMod}
    };
    int count = sizeof(table) / sizeof(table[0]);

    for (int i = 0; i < count; i++) {
        if (table[i].symbol == op) {
            return table[i].handler(left, right);
        }
    }
    printf("Error: Unsupported operator '%c'\n", op);
    return 0;
}

int main(void) {
    printf("Evaluating expressions via Dispatch Table:\n");
    printf(" • 15 + 25 = %d\n", evaluate(15, '+', 25));
    printf(" • 50 - 18 = %d\n", evaluate(50, '-', 18));
    printf(" • 12 * 12 = %d\n", evaluate(12, '*', 12));
    printf(" • 100 / 4 = %d\n", evaluate(100, '/', 4));
    printf(" • 29 %% 5  = %d\n", evaluate(29, '%', 5));

    return 0;
}
