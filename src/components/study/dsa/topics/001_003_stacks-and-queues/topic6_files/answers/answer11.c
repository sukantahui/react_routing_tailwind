#include <stdio.h>
#include <ctype.h>
#include <string.h>

int prec(char c) {
    if (c == '^') return 3;
    if (c == '/' || c == '*') return 2;
    if (c == '+' || c == '-') return 1;
    return -1;
}

void infix_to_postfix(const char *infix, char *postfix) {
    char stack[100]; int top = -1, k = 0;
    for (int i = 0; infix[i] != '\0'; i++) {
        char c = infix[i];
        if (isalnum(c)) postfix[k++] = c;
        else if (c == '(') stack[++top] = c;
        else if (c == ')') {
            while (top != -1 && stack[top] != '(') postfix[k++] = stack[top--];
            top--;
        } else {
            while (top != -1 && prec(c) <= prec(stack[top])) postfix[k++] = stack[top--];
            stack[++top] = c;
        }
    }
    while (top != -1) postfix[k++] = stack[top--];
    postfix[k] = '\0';
}

int main() {
    char infix[] = "a+b*(c^d-e)"; char postfix[100];
    printf("--- Infix to Postfix Shunting-Yard ---\nInfix  : %s\n", infix);
    infix_to_postfix(infix, postfix);
    printf("Postfix: %s\n", postfix);
    return 0;
}
