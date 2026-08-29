#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// ============================================================================
// Singly Linked List Node Structure Definition
// ============================================================================
typedef struct Node {
    int data;               // Data element
    struct Node *next;      // Self-referential pointer to the next node
} Node;

// Create a new heap-allocated node
Node* createNode(int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (!newNode) {
        fprintf(stderr, "[ERROR] Memory allocation failed for new node!\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

// 1. Insert Node at Beginning (Head) - O(1) Time
void insertHead(Node **headRef, int value) {
    Node *newNode = createNode(value);
    newNode->next = *headRef;
    *headRef = newNode;
    printf("[INSERT HEAD] Added %d at head\n", value);
}

// 2. Insert Node at End (Tail) - O(n) Time
void insertTail(Node **headRef, int value) {
    Node *newNode = createNode(value);
    if (*headRef == NULL) {
        *headRef = newNode;
        printf("[INSERT TAIL] Added %d as head node\n", value);
        return;
    }
    Node *curr = *headRef;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = newNode;
    printf("[INSERT TAIL] Added %d at tail\n", value);
}

// 3. Insert Node at Specific 1-based Position - O(n) Time
void insertAtPosition(Node **headRef, int value, int position) {
    if (position <= 1) {
        insertHead(headRef, value);
        return;
    }
    Node *newNode = createNode(value);
    Node *curr = *headRef;
    for (int i = 1; i < position - 1 && curr != NULL; i++) {
        curr = curr->next;
    }
    if (curr == NULL) {
        printf("[WARNING] Position %d out of bounds. Inserting at tail.\n", position);
        insertTail(headRef, value);
        free(newNode);
        return;
    }
    newNode->next = curr->next;
    curr->next = newNode;
    printf("[INSERT POS] Added %d at position %d\n", value, position);
}

// 4. Delete First Occurrence of Node by Value - O(n) Time
void deleteByValue(Node **headRef, int target) {
    if (*headRef == NULL) {
        printf("[DELETE] List is empty. Cannot delete %d.\n", target);
        return;
    }
    Node *curr = *headRef;
    Node *prev = NULL;

    // Case 1: Target is head node
    if (curr->data == target) {
        *headRef = curr->next;
        free(curr);
        printf("[DELETE] Deleted target %d from head\n", target);
        return;
    }

    // Case 2: Search for target in list
    while (curr != NULL && curr->data != target) {
        prev = curr;
        curr = curr->next;
    }

    if (curr == NULL) {
        printf("[DELETE] Value %d not found in list\n", target);
        return;
    }

    prev->next = curr->next;
    free(curr);
    printf("[DELETE] Deleted node containing %d\n", target);
}

// 5. Search for Value in List - O(n) Time
bool search(Node *head, int target) {
    Node *curr = head;
    int index = 0;
    while (curr != NULL) {
        if (curr->data == target) {
            printf("[SEARCH] Found %d at node index %d\n", target, index);
            return true;
        }
        curr = curr->next;
        index++;
    }
    printf("[SEARCH] Value %d not found\n", target);
    return false;
}

// 6. In-Place Reversal Algorithm (3 Pointers) - O(n) Time, O(1) Space
void reverse(Node **headRef) {
    Node *prev = NULL;
    Node *curr = *headRef;
    Node *next = NULL;

    while (curr != NULL) {
        next = curr->next;  // Store next node
        curr->next = prev;  // Reverse current node's pointer
        prev = curr;        // Move prev forward
        curr = next;        // Move curr forward
    }
    *headRef = prev;
    printf("[REVERSE] Linked list reversed in-place\n");
}

// 7. Find Middle Node (Floyd's Fast & Slow Pointers) - O(n) Time
Node* getMiddleNode(Node *head) {
    if (!head) return NULL;
    Node *slow = head;
    Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    printf("[MIDDLE] Middle node data: %d\n", slow->data);
    return slow;
}

// Print All Nodes in List
void printList(Node *head) {
    printf("Current List: ");
    Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

// Safely Free Entire List
void freeList(Node **headRef) {
    Node *curr = *headRef;
    Node *next = NULL;
    while (curr != NULL) {
        next = curr->next;
        free(curr);
        curr = next;
    }
    *headRef = NULL;
    printf("[MEMORY] Freed all linked list nodes safely\n");
}

// ============================================================================
// Main Execution Lab Demonstration
// ============================================================================
int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - SINGLY LINKED LIST MASTER CLASS IN C\n");
    printf("========================================================\n\n");

    Node *head = NULL;

    // Build List
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);
    insertTail(&head, 40);
    insertTail(&head, 50);
    insertAtPosition(&head, 25, 3);

    printList(head);
    printf("\n");

    // Operations
    search(head, 25);
    getMiddleNode(head);
    printf("\n");

    deleteByValue(&head, 25);
    printList(head);
    printf("\n");

    reverse(&head);
    printList(head);
    printf("\n");

    freeList(&head);
    return 0;
}
