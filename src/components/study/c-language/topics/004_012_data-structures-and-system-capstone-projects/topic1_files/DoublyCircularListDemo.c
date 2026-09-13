#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* Doubly Linked List Node Definition */
typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

/* Create a new doubly linked heap node */
DNode *createDNode(int data) {
    DNode *node = (DNode *)malloc(sizeof(DNode));
    if (node == NULL) {
        perror("Failed to allocate memory for DNode");
        exit(EXIT_FAILURE);
    }
    node->data = data;
    node->prev = NULL;
    node->next = NULL;
    return node;
}

/* 1. Insert at Head of Doubly Linked List: O(1) */
void insertDHead(DNode **headRef, int data) {
    DNode *newNode = createDNode(data);
    newNode->next = *headRef;
    if (*headRef != NULL) {
        (*headRef)->prev = newNode;
    }
    *headRef = newNode;
}

/* 2. Insert at Tail of Doubly Linked List: O(N) or O(1) with tail */
void insertDTail(DNode **headRef, int data) {
    DNode *newNode = createDNode(data);
    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }
    DNode *temp = *headRef;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    newNode->prev = temp;
}

/* 3. Delete specific node in O(1) time when node pointer is given */
void deleteDNode(DNode **headRef, DNode *target) {
    if (*headRef == NULL || target == NULL) return;

    /* If target is head node */
    if (*headRef == target) {
        *headRef = target->next;
    }

    /* Adjust next node's prev pointer */
    if (target->next != NULL) {
        target->next->prev = target->prev;
    }

    /* Adjust prev node's next pointer */
    if (target->prev != NULL) {
        target->prev->next = target->next;
    }

    free(target);
}

/* 4. Display Forward and Backward */
void displayForward(const DNode *head) {
    printf("    Forward  : ");
    const DNode *curr = head;
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

void displayBackward(const DNode *head) {
    if (head == NULL) {
        printf("    Backward : NULL\n");
        return;
    }
    /* Seek to tail */
    const DNode *curr = head;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    printf("    Backward : ");
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->prev;
    }
    printf("NULL\n");
}

/* 5. Free Doubly Linked List */
void freeDList(DNode **headRef) {
    DNode *curr = *headRef;
    while (curr != NULL) {
        DNode *next = curr->next;
        free(curr);
        curr = next;
    }
    *headRef = NULL;
}

int main(void) {
    printf("=====================================================\n");
    printf("  Doubly Linked List & Bidirectional Traversal in C\n");
    printf("=====================================================\n\n");

    DNode *head = NULL;

    printf(">>> Step 1: Populating Doubly Linked List...\n");
    insertDHead(&head, 20);
    insertDHead(&head, 10);
    insertDTail(&head, 30);
    insertDTail(&head, 40);
    insertDTail(&head, 50);

    displayForward(head);
    displayBackward(head);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 2: Deleting middle node (30) in O(1) pointer time...\n");
    /* Locate node with data 30 */
    DNode *target = head;
    while (target != NULL && target->data != 30) {
        target = target->next;
    }
    if (target != NULL) {
        deleteDNode(&head, target);
        printf("    Node 30 deleted.\n");
    }

    displayForward(head);
    displayBackward(head);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 3: Deallocating all heap nodes...\n");
    freeDList(&head);
    displayForward(head);

    printf("\n=== Doubly Linked List Operations Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
