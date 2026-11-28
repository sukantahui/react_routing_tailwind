/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic 3: Doubly Linked List — Bidirectional Pointers (prev, next),
 *          O(1) Node Deletion, Node Swapping & Safe Memory Cleanup
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

DNode* createDNode(int val) {
    DNode *n = (DNode *)malloc(sizeof(*n));
    if (!n) {
        fprintf(stderr, "Heap allocation failed!\n");
        exit(EXIT_FAILURE);
    }
    n->data = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

// Insert at Tail maintaining both head and tail pointers: O(1)
void insertTail(DNode **headRef, DNode **tailRef, int val) {
    DNode *n = createDNode(val);
    if (*headRef == NULL) {
        *headRef = *tailRef = n;
        return;
    }
    n->prev = *tailRef;
    (*tailRef)->next = n;
    *tailRef = n;
}

// Delete a known node pointer directly in O(1) time!
void deleteNode(DNode **headRef, DNode **tailRef, DNode *del) {
    if (!headRef || !del) return;

    if (*headRef == del) *headRef = del->next;
    if (*tailRef == del) *tailRef = del->prev;

    if (del->next != NULL) del->next->prev = del->prev;
    if (del->prev != NULL) del->prev->next = del->next;

    free(del);
}

// Swap adjacent nodes A and B (where B == A->next) by relinking pointers
void swapAdjacent(DNode **headRef, DNode **tailRef, DNode *a) {
    if (!a || !a->next) return;
    DNode *b = a->next;
    DNode *before = a->prev;
    DNode *after = b->next;

    // Step 1: Connect outer neighbors to new inner nodes
    if (before) before->next = b;
    else *headRef = b;

    if (after) after->prev = a;
    else *tailRef = a;

    // Step 2: Rewire A and B between before and after
    b->prev = before;
    b->next = a;
    a->prev = b;
    a->next = after;
}

void printForward(const DNode *head, const char *label) {
    printf("%s (Forward):  NULL <- ", label);
    while (head) {
        printf("[%d]%s", head->data, head->next ? " <-> " : " -> ");
        head = head->next;
    }
    printf("NULL\n");
}

void printBackward(const DNode *tail, const char *label) {
    printf("%s (Backward): NULL <- ", label);
    while (tail) {
        printf("[%d]%s", tail->data, tail->prev ? " <-> " : " -> ");
        tail = tail->prev;
    }
    printf("NULL\n");
}

void freeDoublyList(DNode **headRef, DNode **tailRef) {
    DNode *curr = *headRef;
    while (curr != NULL) {
        DNode *temp = curr->next;
        free(curr);
        curr = temp;
    }
    *headRef = NULL;
    *tailRef = NULL;
}

int main(void) {
    DNode *head = NULL, *tail = NULL;

    insertTail(&head, &tail, 10);
    insertTail(&head, &tail, 20);
    insertTail(&head, &tail, 30);
    insertTail(&head, &tail, 40);

    printForward(head, "Initial");
    printBackward(tail, "Initial");

    // Swap [20] and [30]
    swapAdjacent(&head, &tail, head->next);
    printForward(head, "After Swapping 20 & 30");

    // Delete [30] directly in O(1)
    deleteNode(&head, &tail, head->next);
    printForward(head, "After Deleting 30");

    freeDoublyList(&head, &tail);
    return 0;
}
