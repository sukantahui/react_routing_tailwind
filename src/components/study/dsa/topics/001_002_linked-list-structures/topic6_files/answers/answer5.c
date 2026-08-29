#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

DNode* insert_doubly_head(DNode *head, int val) {
    DNode *new_node = (DNode*)malloc(sizeof(DNode));
    new_node->data = val;
    new_node->prev = NULL;
    new_node->next = head;

    if (head) head->prev = new_node;
    return new_node;
}

void print_bidirectional(DNode *head) {
    printf("Forward : ");
    DNode *curr = head, *tail = NULL;
    while (curr) {
        printf("%d <-> ", curr->data);
        if (!curr->next) tail = curr;
        curr = curr->next;
    }
    printf("NULL\nBackward: ");
    while (tail) {
        printf("%d <-> ", tail->data);
        tail = tail->prev;
    }
    printf("NULL\n");
}

int main() {
    DNode *head = NULL;
    printf("--- Doubly Linked List Bi-Directional Traversal ---\n");
    head = insert_doubly_head(head, 30);
    head = insert_doubly_head(head, 20);
    head = insert_doubly_head(head, 10);

    print_bidirectional(head);
    return 0;
}
