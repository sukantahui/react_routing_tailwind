#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

DNode* delete_doubly_node(DNode *head, DNode *del) {
    if (!head || !del) return head;
    if (head == del) head = del->next;
    if (del->next) del->next->prev = del->prev;
    if (del->prev) del->prev->next = del->next;
    free(del);
    return head;
}

void print_doubly(DNode *h) { while (h) { printf("%d <-> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    DNode *n1 = (DNode*)malloc(sizeof(DNode)); n1->data = 10; n1->prev = NULL;
    DNode *n2 = (DNode*)malloc(sizeof(DNode)); n2->data = 20; n2->prev = n1; n1->next = n2;
    DNode *n3 = (DNode*)malloc(sizeof(DNode)); n3->data = 30; n3->prev = n2; n2->next = n3; n3->next = NULL;

    printf("--- Doubly Linked List Node Deletion ---\nBefore: "); print_doubly(n1);
    DNode *head = delete_doubly_node(n1, n2);
    printf("After deleting node 20: "); print_doubly(head);

    return 0;
}
