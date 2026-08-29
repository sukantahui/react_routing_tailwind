#include <stdio.h>
#define N 100

typedef struct {
    int main_stack[N], min_stack[N];
    int top_m, top_min;
} MinStack;

void init_min_stack(MinStack *s) { s->top_m = -1; s->top_min = -1; }

void push_min(MinStack *s, int val) {
    s->main_stack[++(s->top_m)] = val;
    if (s->top_min == -1 || val <= s->min_stack[s->top_min]) {
        s->min_stack[++(s->top_min)] = val;
    }
}

int get_min(MinStack *s) { return (s->top_min == -1) ? -1 : s->min_stack[s->top_min]; }

int main() {
    MinStack s; init_min_stack(&s);
    printf("--- O(1) Min Stack Engine ---\n");
    push_min(&s, 18); push_min(&s, 19); push_min(&s, 29); push_min(&s, 15);
    printf("Current Min: %d\n", get_min(&s));
    return 0;
}
