#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
    struct Node *random;
} Node;

Node* copy_random_list(Node *head) {
    if (!head) return NULL;
    // Step 1: Interleave cloned nodes
    Node *curr = head;
    while (curr) {
        Node *copy = (Node*)malloc(sizeof(Node));
        copy->data = curr->data;
        copy->next = curr->next;
        curr->next = copy;
        curr = copy->next;
    }
    // Step 2: Assign random pointers
    curr = head;
    while (curr) {
        if (curr->random) curr->next->random = curr->random->next;
        else curr->next->random = NULL;
        curr = curr->next->next;
    }
    // Step 3: Separate lists
    curr = head;
    Node *copy_head = head->next;
    while (curr) {
        Node *temp = curr->next;
        curr->next = temp->next;
        if (temp->next) temp->next = temp->next->next;
        curr = curr->next;
    }
    return copy_head;
}

int main() {
    Node *n1 = (Node*)malloc(sizeof(Node)); n1->data = 10;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 20;
    n1->next = n2; n2->next = NULL;
    n1->random = n2; n2->random = n1;

    printf("--- Copy List with Random Pointers (Interleaving) ---\n");
    Node *clone = copy_random_list(n1);
    printf("Clone Node 1: Val=%d, Random Val=%d\n", clone->data, clone->random->data);
    printf("Clone Node 2: Val=%d, Random Val=%d\n", clone->next->data, clone->next->random->data);

    return 0;
}
