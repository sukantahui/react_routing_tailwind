#include <stdio.h>
#include <stdlib.h>

/**
 * Project 9: Linked List Head Insertion & Deletion Engine using Double Pointers (Node**)
 * Implements singly linked list operations mutating head pointer via double pointer indirection.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

typedef struct Node {
    int data;
    struct Node *next;
} Node;

void insertHead(Node **head, int val) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode; // Mutates caller's head pointer!
}

void deleteHead(Node **head) {
    if (head == NULL || *head == NULL) return;
    Node *temp = *head;
    *head = (*head)->next;
    free(temp);
}

void printList(const Node *head) {
    printf("List: [ ");
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL ]\n");
}

void freeList(Node **head) {
    while (*head != NULL) {
        deleteHead(head);
    }
}

int main(void) {
    Node *head = NULL;

    printf("Inserting at Head via Double Pointer (Node**):\n");
    insertHead(&head, 10);
    insertHead(&head, 20);
    insertHead(&head, 30);
    printList(head);

    printf("\nDeleting Head node:\n");
    deleteHead(&head);
    printList(head);

    freeList(&head);
    printf("\nFreed list. Head pointer = %p\n", (void*)head);

    return 0;
}
