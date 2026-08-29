#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

bool has_cycle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

int main() {
    Node *n1 = (Node*)malloc(sizeof(Node)); n1->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    n1->next = n2; n2->next = n1; // Cycle

    printf("--- Fast & Slow Pointer Cycle Detection ---\n");
    if (has_cycle(n1)) printf("Cycle Detected in Linked List!\n");
    return 0;
}
