#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* reverse_recursive(Node *head) {
    if (!head || !head->next) return head;
    Node *new_head = reverse_recursive(head->next);
    head->next->next = head;
    head->next = NULL;
    return new_head;
}

void print_list(Node *h) { while (h) { printf("%d -> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 10;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 20;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 30; h->next->next->next = NULL;

    printf("--- Recursive List Reversal ---\nBefore: "); print_list(h);
    h = reverse_recursive(h);
    printf("Reversed: "); print_list(h);

    return 0;
}
