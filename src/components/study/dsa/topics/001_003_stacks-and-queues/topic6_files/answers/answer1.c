#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 5

typedef struct {
    int data[MAX];
    int top;
} ArrayStack;

void init_stack(ArrayStack *s) { s->top = -1; }

bool is_full(ArrayStack *s) { return s->top == MAX - 1; }
bool is_empty(ArrayStack *s) { return s->top == -1; }

void push(ArrayStack *s, int val) {
    if (is_full(s)) { printf("Stack Overflow! Cannot push %d\n", val); return; }
    s->data[++(s->top)] = val;
    printf("Pushed: %d\n", val);
}

int pop(ArrayStack *s) {
    if (is_empty(s)) { printf("Stack Underflow!\n"); return -1; }
    return s->data[(s->top)--];
}

int main() {
    ArrayStack s; init_stack(&s);
    printf("--- Array Stack ADT ---\n");
    push(&s, 10); push(&s, 20); push(&s, 30);
    printf("Popped: %d\n", pop(&s));
    return 0;
}
