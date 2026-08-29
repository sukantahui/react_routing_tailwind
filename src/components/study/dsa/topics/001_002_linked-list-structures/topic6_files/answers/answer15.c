#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* merge_two_sorted(Node *l1, Node *l2) {
    Node dummy;
    Node *tail = &dummy;
    dummy.next = NULL;

    while (l1 && l2) {
        if (l1->data <= l2->data) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = (l1) ? l1 : l2;
    return dummy.next;
}

void print_list(Node *h) { while (h) { printf("%d -> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *l1 = (Node*)malloc(sizeof(Node)); l1->data = 1;
    l1->next = (Node*)malloc(sizeof(Node)); l1->next->data = 3; l1->next->next = NULL;

    Node *l2 = (Node*)malloc(sizeof(Node)); l2->data = 2;
    l2->next = (Node*)malloc(sizeof(Node)); l2->next->data = 4; l2->next->next = NULL;

    printf("--- Merge Two Sorted Lists ---\n");
    Node *merged = merge_two_sorted(l1, l2);
    print_list(merged);

    return 0;
}
