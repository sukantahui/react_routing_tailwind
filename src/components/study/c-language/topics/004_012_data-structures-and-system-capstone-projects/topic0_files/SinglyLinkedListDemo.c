#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* Singly Linked List Node Definition */
typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* Helper: Create a new heap-allocated node */
Node *createNode(int data) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (newNode == NULL) {
        fprintf(stderr, "Error: Memory allocation failed for new node!\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

/* 1. Insert at head (Beginning): O(1) */
void insertHead(Node **headRef, int data) {
    Node *newNode = createNode(data);
    newNode->next = *headRef;
    *headRef = newNode;
}

/* 2. Insert at tail (End): O(N) */
void insertTail(Node **headRef, int data) {
    Node *newNode = createNode(data);
    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }
    Node *current = *headRef;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
}

/* 3. Delete node by value: O(N) */
bool deleteNode(Node **headRef, int key) {
    if (*headRef == NULL) return false;

    Node *temp = *headRef;

    /* If head holds the key */
    if (temp->data == key) {
        *headRef = temp->next;
        free(temp);
        return true;
    }

    /* Search for key while keeping track of previous node */
    Node *prev = NULL;
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return false; /* Key not found */

    prev->next = temp->next;
    free(temp);
    return true;
}

/* 4. In-place iterative list reversal: O(N) time, O(1) space */
void reverseList(Node **headRef) {
    Node *prev = NULL;
    Node *current = *headRef;
    Node *next = NULL;

    while (current != NULL) {
        next = current->next;   /* Store next pointer */
        current->next = prev;   /* Reverse current node's pointer */
        prev = current;         /* Move prev forward */
        current = next;         /* Move current forward */
    }
    *headRef = prev;
}

/* 5. Traverse and display list */
void displayList(const Node *head) {
    if (head == NULL) {
        printf("    [Empty List: NULL]\n");
        return;
    }
    printf("    ");
    const Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

/* 6. Clean up heap memory */
void freeList(Node **headRef) {
    Node *current = *headRef;
    while (current != NULL) {
        Node *next = current->next;
        free(current);
        current = next;
    }
    *headRef = NULL;
}

int main(void) {
    printf("=====================================================\n");
    printf("  Singly Linked List Implementation in Pure C\n");
    printf("=====================================================\n\n");

    Node *head = NULL;

    printf(">>> Step 1: Inserting elements at Head and Tail...\n");
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);
    insertTail(&head, 40);
    insertTail(&head, 50);

    printf("    Current List:\n");
    displayList(head);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 2: Deleting node with value 30...\n");
    if (deleteNode(&head, 30)) {
        printf("    Node 30 deleted successfully.\n");
    }
    printf("    Current List:\n");
    displayList(head);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 3: In-Place Iterative List Reversal (O(1) auxiliary space)...\n");
    reverseList(&head);
    printf("    Reversed List:\n");
    displayList(head);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 4: Deallocating all heap nodes with freeList()...\n");
    freeList(&head);
    displayList(head);

    printf("\n=== Singly Linked List Operations Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
