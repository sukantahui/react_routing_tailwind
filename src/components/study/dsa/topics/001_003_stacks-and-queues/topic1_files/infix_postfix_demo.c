#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAX 100

typedef struct {
    char items[MAX];
    int top;
} CharStack;

void pushChar(CharStack *s, char c) {
    s->items[++(s->top)] = c;
}

char popChar(CharStack *s) {
    if (s->top == -1) return '\0';
    return s->items[(s->top)--];
}

char peekChar(CharStack *s) {
    if (s->top == -1) return '\0';
    return s->items[s->top];
}

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    if (op == '^') return 3;
    return 0;
}

void infixToPostfix(const char *infix, char *postfix) {
    CharStack s;
    s.top = -1;
    int k = 0;

    for (int i = 0; infix[i] != '\0'; i++) {
        char ch = infix[i];
        if (isalnum(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            pushChar(&s, ch);
        } else if (ch == ')') {
            while (s.top != -1 && peekChar(&s) != '(') {
                postfix[k++] = popChar(&s);
            }
            popChar(&s); // Pop '('
        } else { // Operator
            while (s.top != -1 && precedence(peekChar(&s)) >= precedence(ch)) {
                postfix[k++] = popChar(&s);
            }
            pushChar(&s, ch);
        }
    }

    while (s.top != -1) {
        postfix[k++] = popChar(&s);
    }
    postfix[k] = '\0';
}

int main() {
    printf("=== Infix to Postfix Expression Converter in C ===\n\n");
    const char *infix = "A+(B*C-(D/E^F)*G)*H";
    char postfix[MAX];

    infixToPostfix(infix, postfix);

    printf("Infix Expression  : %s\n", infix);
    printf("Postfix Result    : %s\n", postfix);

    return 0;
}
