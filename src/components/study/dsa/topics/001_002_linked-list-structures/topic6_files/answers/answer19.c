#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* find_nth_from_end(Node *head, int n) {
    Node *fast = head, *slow = head;
    for (int i = 0; i < n; i++) {
        if (!fast) return NULL;
        fast = fast->next;
    }
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 10;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 20;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 30;
    h->next->next->next = (Node*)malloc(sizeof(Node)); h->next->next->next->data = 40;
    h->next->next->next->next = NULL;

    printf("--- N-th Node from End (Two-Pointer Offset) ---\nList: 10 -> 20 -> 30 -> 40 -> NULL\n");
    int n = 2;
    Node *ans = find_nth_from_end(h, n);
    if (ans) printf("The %d-nd node from end = %d\n", n, ans->data);

    return 0;
}
