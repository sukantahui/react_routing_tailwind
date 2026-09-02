#include <stdio.h>
#include <stdlib.h>

/**
 * Project 5: Dynamic Array Stack with Auto-Resizing via realloc and Pointers
 * Implements a dynamic growth stack LIFO structure with automatic capacity doubling.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

typedef struct {
    int *data;
    int capacity;
    int top;
} DynamicStack;

void initStack(DynamicStack *s, int initialCapacity) {
    s->data = (int*)malloc(initialCapacity * sizeof(int));
    s->capacity = initialCapacity;
    s->top = -1;
}

void push(DynamicStack *s, int val) {
    if (s->top + 1 >= s->capacity) {
        // Double the capacity using realloc
        s->capacity *= 2;
        int *newPtr = (int*)realloc(s->data, s->capacity * sizeof(int));
        if (newPtr != NULL) {
            s->data = newPtr;
            printf("   [Auto-Resize] Stack capacity doubled to %d elements.\n", s->capacity);
        }
    }
    s->data[++(s->top)] = val;
}

int pop(DynamicStack *s) {
    if (s->top >= 0) {
        return s->data[(s->top)--];
    }
    return -1; // Stack empty
}

void freeStack(DynamicStack *s) {
    free(s->data);
    s->data = NULL;
    s->top = -1;
    s->capacity = 0;
}

int main(void) {
    DynamicStack stack;
    initStack(&stack, 2);

    printf("Pushing 5 elements into initial capacity 2 stack:\n");
    for (int i = 1; i <= 5; i++) {
        push(&stack, i * 10);
        printf(" • Pushed: %d (Size: %d/%d)\n", i * 10, stack.top + 1, stack.capacity);
    }

    printf("\nPopping all elements from stack:\n");
    while (stack.top >= 0) {
        printf(" • Popped: %d\n", pop(&stack));
    }

    freeStack(&stack);
    return 0;
}
