#include <stdio.h>
#include <ctype.h>

int evaluate_postfix(const char *expr) {
    int stack[100], top = -1;
    for (int i = 0; expr[i] != '\0'; i++) {
        if (isdigit(expr[i])) stack[++top] = expr[i] - '0';
        else {
            int val2 = stack[top--];
            int val1 = stack[top--];
            switch (expr[i]) {
                case '+': stack[++top] = val1 + val2; break;
                case '-': stack[++top] = val1 - val2; break;
                case '*': stack[++top] = val1 * val2; break;
                case '/': stack[++top] = val1 / val2; break;
            }
        }
    }
    return stack[top];
}

int main() {
    char expr[] = "231*+9-"; // 2 + (3*1) - 9 = 5 - 9 = -4
    printf("--- Postfix Expression Evaluator ---\nExpression: %s\nEvaluated Result = %d\n", expr, evaluate_postfix(expr));
    return 0;
}
