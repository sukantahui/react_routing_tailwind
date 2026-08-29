#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* reverse_k_group(Node *head, int k) {
    Node *curr = head;
    int count = 0;
    while (curr && count < k) { curr = curr->next; count++; }
    if (count == k) {
        Node *prev = NULL, *next = NULL, *c = head;
        for (int i = 0; i < k; i++) {
            next = c->next;
            c->next = prev;
            prev = c;
            c = next;
        }
        if (next) head->next = reverse_k_group(next, k);
        return prev;
    }
    return head;
}

void print_list(Node *h) { while (h) { printf("%d -> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 1;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 2;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 3;
    h->next->next->next = (Node*)malloc(sizeof(Node)); h->next->next->next->data = 4;
    h->next->next->next->next = (Node*)malloc(sizeof(Node)); h->next->next->next->next->data = 5;
    h->next->next->next->next->next = NULL;

    printf("--- Reverse Nodes in K-Group (K=2) ---\nBefore: "); print_list(h);
    h = reverse_k_group(h, 2);
    printf("After : "); print_list(h);

    return 0;
}
