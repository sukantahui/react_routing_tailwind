#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *top;
} LinkedStack;

void push_link(LinkedStack *s, int val) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = val; n->next = s->top;
    s->top = n;
}

int pop_link(LinkedStack *s) {
    if (!s->top) return -1;
    Node *temp = s->top;
    int val = temp->data;
    s->top = s->top->next;
    free(temp);
    return val;
}

int main() {
    LinkedStack s = {NULL};
    printf("--- Linked List Stack ---\n");
    push_link(&s, 100); push_link(&s, 200);
    printf("Popped: %d\n", pop_link(&s));
    return 0;
}
