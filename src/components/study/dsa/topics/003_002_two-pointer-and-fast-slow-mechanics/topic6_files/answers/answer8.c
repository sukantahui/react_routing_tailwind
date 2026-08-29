#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* find_middle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 10;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 20;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 30;
    h->next->next->next = NULL;

    printf("--- Fast & Slow Pointer Middle Node Finder ---\n");
    Node *mid = find_middle(h);
    if (mid) printf("Middle Node Data = %d\n", mid->data);
    return 0;
}
