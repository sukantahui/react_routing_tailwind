#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* reverse_iterative(Node *head) {
    Node *prev = NULL, *curr = head, *next = NULL;
    while (curr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

void print_list(Node *h) { while (h) { printf("%d -> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 1;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 2;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 3; h->next->next->next = NULL;

    printf("--- Iterative List Reversal (3-Pointer) ---\nBefore: "); print_list(h);
    h = reverse_iterative(h);
    printf("Reversed: "); print_list(h);

    return 0;
}
