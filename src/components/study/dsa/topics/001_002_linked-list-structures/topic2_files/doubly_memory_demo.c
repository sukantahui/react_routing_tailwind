#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

DNode* createDNode(int val) {
    DNode* n = (DNode*)malloc(sizeof(DNode));
    n->data = val;
    n->prev = n->next = NULL;
    return n;
}

void insertAfter(DNode* prevNode, int val) {
    if (!prevNode) return;
    DNode* newNode = createDNode(val);
    newNode->next = prevNode->next;
    newNode->prev = prevNode;
    if (prevNode->next) prevNode->next->prev = newNode;
    prevNode->next = newNode;
}

void deleteNode(DNode** head, DNode* del) {
    if (!head || !del) return;
    if (*head == del) *head = del->next;
    if (del->next) del->next->prev = del->prev;
    if (del->prev) del->prev->next = del->next;
    free(del);
}

void printList(DNode* head) {
    printf("Doubly Linked List: ");
    while (head) {
        printf("[%d] <-> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    printf("=== Doubly Linked List Memory Management in C ===\n\n");
    DNode* head = createDNode(10);
    insertAfter(head, 20);
    insertAfter(head->next, 30);

    printList(head);
    deleteNode(&head, head->next); // Delete node with value 20
    printList(head);

    return 0;
}
