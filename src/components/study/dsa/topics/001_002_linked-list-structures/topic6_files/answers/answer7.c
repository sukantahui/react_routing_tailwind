#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* insert_circular(Node *head, int val) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = val;
    if (!head) {
        n->next = n;
        return n;
    }
    Node *curr = head;
    while (curr->next != head) curr = curr->next;
    curr->next = n;
    n->next = head;
    return head;
}

void print_circular(Node *head, int passes) {
    if (!head) return;
    Node *curr = head;
    int count = 0;
    printf("Circular Traversal (%d rounds): ", passes);
    while (count < passes) {
        printf("%d -> ", curr->data);
        curr = curr->next;
        if (curr == head) count++;
    }
    printf("(loop continues...)\n");
}

int main() {
    Node *head = NULL;
    printf("--- Circular Singly Linked List Simulation ---\n");
    head = insert_circular(head, 10);
    head = insert_circular(head, 20);
    head = insert_circular(head, 30);

    print_circular(head, 2);
    return 0;
}
