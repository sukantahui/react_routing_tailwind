#include <stdio.h>

#define N 100

typedef struct {
    int val_stack[N], min_stack[N], max_stack[N];
    int top;
} MinMaxStack;

void init_minmax(MinMaxStack *s) { s->top = -1; }

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

void push_minmax(MinMaxStack *s, int val) {
    s->top++;
    s->val_stack[s->top] = val;
    if (s->top == 0) {
        s->min_stack[s->top] = val;
        s->max_stack[s->top] = val;
    } else {
        s->min_stack[s->top] = min(val, s->min_stack[s->top - 1]);
        s->max_stack[s->top] = max(val, s->max_stack[s->top - 1]);
    }
}

int get_min(MinMaxStack *s) { return s->min_stack[s->top]; }
int get_max(MinMaxStack *s) { return s->max_stack[s->top]; }

int main() {
    MinMaxStack s; init_minmax(&s);
    printf("--- O(1) Min-Max Stack Engine ---\n");
    push_minmax(&s, 10); push_minmax(&s, 40); push_minmax(&s, 5); push_minmax(&s, 30);
    printf("Current Min = %d, Current Max = %d\n", get_min(&s), get_max(&s));
    return 0;
}
