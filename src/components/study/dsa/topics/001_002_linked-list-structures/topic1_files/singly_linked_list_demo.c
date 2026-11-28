/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic 1: Singly Linked List — Head/Tail Insertion, Middle Deletion &
 *          Iterative 3-Pointer Reversal
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Helper: Create a single node on the heap
Node* createNode(int val) {
    Node *newNode = (Node *)malloc(sizeof(*newNode));
    if (newNode == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = val;
    newNode->next = NULL;
    return newNode;
}

// 1. Insert at Head: O(1) time
void insertHead(Node **headRef, int val) {
    Node *newNode = createNode(val);
    newNode->next = *headRef; // Step 1: Point new node to old head
    *headRef = newNode;       // Step 2: Move head to new node
}

// 2. Insert at Tail: O(N) time (without a tail pointer)
void insertTail(Node **headRef, int val) {
    Node *newNode = createNode(val);
    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }
    Node *curr = *headRef;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = newNode;
}

// 3. Delete first occurrence of target (handles Head & Middle): O(N) time
void deleteByValue(Node **headRef, int target) {
    if (*headRef == NULL) {
        printf("List is empty. Nothing to delete.\n");
        return;
    }

    Node *curr = *headRef;
    // Case A: Target is the head node
    if (curr->data == target) {
        *headRef = curr->next;
        free(curr);
        printf("Deleted head node (%d).\n", target);
        return;
    }

    // Case B: Stop ONE node BEFORE the target node
    while (curr->next != NULL && curr->next->data != target) {
        curr = curr->next;
    }

    if (curr->next == NULL) {
        printf("Value %d not found in the list.\n", target);
        return;
    }

    Node *toDelete = curr->next;
    curr->next = toDelete->next; // Bypass toDelete safely
    free(toDelete);              // Free heap memory
    printf("Deleted middle/tail node (%d).\n", target);
}

// 4. Iterative 3-Pointer Reversal: O(N) time, O(1) extra space
void reverseList(Node **headRef) {
    Node *prev = NULL;
    Node *curr = *headRef;
    Node *next = NULL;

    while (curr != NULL) {
        next = curr->next; // 1. Save rest of the list before breaking link
        curr->next = prev; // 2. Flip arrow backward
        prev = curr;       // 3. Advance prev
        curr = next;       // 4. Advance curr
    }

    *headRef = prev; // prev now sits at the new head!
}

void printList(const Node *head, const char *label) {
    printf("%s: ", label);
    const Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

void freeList(Node **headRef) {
    Node *curr = *headRef;
    while (curr != NULL) {
        Node *temp = curr->next;
        free(curr);
        curr = temp;
    }
    *headRef = NULL; // Neutralize dangling head pointer
}

int main(void) {
    Node *head = NULL;

    // Build: 10 -> 20 -> 30 -> 40 -> NULL
    insertTail(&head, 20);
    insertTail(&head, 30);
    insertTail(&head, 40);
    insertHead(&head, 10);
    printList(head, "Initial List");

    // Delete middle node 30
    deleteByValue(&head, 30);
    printList(head, "After Deleting 30");

    // Reverse using 3 pointers (prev, curr, next)
    reverseList(&head);
    printList(head, "After 3-Pointer Reversal");

    // Clean up all heap memory
    freeList(&head);
    return 0;
}
