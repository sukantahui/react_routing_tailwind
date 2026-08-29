#include <stdio.h>
#include <stdlib.h>

// Doubly Linked List Node Structure
typedef struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
} Node;

Node* createNode(int val) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = val;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

void insertHead(Node **headRef, int val) {
    Node *newNode = createNode(val);
    newNode->next = *headRef;
    if (*headRef != NULL) {
        (*headRef)->prev = newNode;
    }
    *headRef = newNode;
}

void printForward(Node *head) {
    printf("Forward Traversal: ");
    Node *curr = head;
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

void freeList(Node *head) {
    Node *tmp;
    while (head != NULL) {
        tmp = head;
        head = head->next;
        free(tmp);
    }
}

int main() {
    printf("=== Doubly Linked List Mechanics in C ===\n\n");
    Node *head = NULL;

    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);

    printForward(head);
    freeList(head);

    return 0;
}
