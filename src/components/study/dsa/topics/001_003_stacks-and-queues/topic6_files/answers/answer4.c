#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool is_balanced(const char *expr) {
    char stack[100];
    int top = -1;
    for (int i = 0; expr[i] != '\0'; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '{' || ch == '[') stack[++top] = ch;
        else if (ch == ')' || ch == '}' || ch == ']') {
            if (top == -1) return false;
            char last = stack[top--];
            if ((ch == ')' && last != '(') ||
                (ch == '}' && last != '{') ||
                (ch == ']' && last != '[')) return false;
        }
    }
    return top == -1;
}

int main() {
    const char *expr1 = "{[()]}";
    const char *expr2 = "{[(])}";
    printf("--- Balanced Parentheses Matcher ---\n");
    printf("%s -> %s\n", expr1, is_balanced(expr1) ? "Balanced" : "Unbalanced");
    printf("%s -> %s\n", expr2, is_balanced(expr2) ? "Balanced" : "Unbalanced");
    return 0;
}
