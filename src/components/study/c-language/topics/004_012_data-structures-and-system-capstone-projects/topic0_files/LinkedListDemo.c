#include <stdio.h>
#include <stdlib.h>

/**
 * LinkedListDemo.c
 * Singly Linked List insertion and traversal in C
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

typedef struct Node {
    int data;
    struct Node *next;
} Node;

void insertHead(Node **headRef, int val) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (newNode == NULL) return;
    newNode->data = val;
    newNode->next = *headRef;
    *headRef = newNode;
}

void printList(const Node *head) {
    const Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

void freeList(Node **headRef) {
    Node *curr = *headRef;
    Node *next = NULL;
    while (curr != NULL) {
        next = curr->next;
        free(curr);
        curr = next;
    }
    *headRef = NULL;
}

int main(void) {
    Node *head = NULL;

    printf("=== Singly Linked List in Pure C ===\n\n");
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);

    printf("Linked List Elements: ");
    printList(head);

    freeList(&head);
    printf("Linked List Memory Deallocated Cleanly.\n");

    return 0;
}
