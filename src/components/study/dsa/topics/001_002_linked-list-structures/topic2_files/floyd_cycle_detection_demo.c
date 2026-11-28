/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic 2: Floyd's Cycle-Finding Algorithm — Cycle Detection, Loop Start
 *          Location & Safe Loop Removal
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int val) {
    Node *n = (Node *)malloc(sizeof(*n));
    if (!n) exit(EXIT_FAILURE);
    n->data = val;
    n->next = NULL;
    return n;
}

// Phase 1: Detect if a cycle exists using Tortoise (1x) & Hare (2x)
Node* detectMeetingPoint(Node *head) {
    Node *slow = head;
    Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;       // 1 step
        fast = fast->next->next; // 2 steps
        if (slow == fast) {
            return slow;         // Collision inside the loop!
        }
    }
    return NULL; // Reached NULL -> No cycle
}

// Phase 2: Find the exact node where the cycle begins
Node* findCycleStart(Node *head, Node *meetingPoint) {
    Node *entry = head;
    Node *slow = meetingPoint;

    while (entry != slow) {
        entry = entry->next; // 1 step from head
        slow = slow->next;   // 1 step from meeting point
    }
    return entry; // Guaranteed to meet at loop start!
}

// Phase 3: Remove the cycle by finding the last node in the loop
void detectAndRemoveCycle(Node *head) {
    if (head == NULL || head->next == NULL) return;

    Node *meeting = detectMeetingPoint(head);
    if (meeting == NULL) {
        printf("No cycle detected in the list.\n");
        return;
    }

    Node *loopStart = findCycleStart(head, meeting);
    printf("Cycle detected! Loop starts at node [%d].\n", loopStart->data);

    // Walk around the loop until we find the node whose next == loopStart
    Node *ptr = loopStart;
    while (ptr->next != loopStart) {
        ptr = ptr->next;
    }
    printf("Breaking loop edge: [%d]->next = NULL\n", ptr->data);
    ptr->next = NULL;
}

void printSafe(const Node *head) {
    printf("Clean List: ");
    while (head != NULL) {
        printf("[%d] -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

void freeList(Node **headRef) {
    Node *curr = *headRef;
    while (curr != NULL) {
        Node *tmp = curr->next;
        free(curr);
        curr = tmp;
    }
    *headRef = NULL;
}

int main(void) {
    // Build: 10 -> 20 -> 30 -> 40 -> 50 -> (back to 30)
    Node *n1 = createNode(10);
    Node *n2 = createNode(20);
    Node *n3 = createNode(30);
    Node *n4 = createNode(40);
    Node *n5 = createNode(50);

    n1->next = n2;
    n2->next = n3;
    n3->next = n4;
    n4->next = n5;
    n5->next = n3; // Deliberate cycle back to 30!

    detectAndRemoveCycle(n1);
    printSafe(n1);
    freeList(&n1);

    return 0;
}
