#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
    struct Node *child;
} Node;

Node* flatten_multi_level(Node *head) {
    if (!head) return NULL;
    Node *curr = head;
    while (curr) {
        if (curr->child) {
            Node *next = curr->next;
            Node *child_tail = curr->child;
            while (child_tail->next) child_tail = child_tail->next;

            curr->next = curr->child;
            curr->child->prev = curr;
            curr->child = NULL;

            if (next) {
                child_tail->next = next;
                next->prev = child_tail;
            }
        }
        curr = curr->next;
    }
    return head;
}

void print_flat(Node *h) { while (h) { printf("%d <-> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *n1 = (Node*)malloc(sizeof(Node)); n1->data = 1; n1->prev = NULL; n1->child = NULL;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2; n2->prev = n1; n1->next = n2; n2->next = NULL; n2->child = NULL;

    Node *c1 = (Node*)malloc(sizeof(Node)); c1->data = 3; c1->prev = NULL; c1->next = NULL; c1->child = NULL;
    n1->child = c1;

    printf("--- Flatten Multi-Level Doubly Linked List ---\n");
    Node *head = flatten_multi_level(n1);
    print_flat(head);

    return 0;
}
