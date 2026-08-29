#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* find_middle(Node *head) {
    if (!head) return NULL;
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 10;
    head->next = (Node*)malloc(sizeof(Node)); head->next->data = 20;
    head->next->next = (Node*)malloc(sizeof(Node)); head->next->next->data = 30;
    head->next->next->next = (Node*)malloc(sizeof(Node)); head->next->next->next->data = 40;
    head->next->next->next->next = (Node*)malloc(sizeof(Node)); head->next->next->next->next->data = 50;
    head->next->next->next->next->next = NULL;

    printf("--- Fast & Slow Pointer Middle Finder ---\nList: 10 -> 20 -> 30 -> 40 -> 50 -> NULL\n");
    Node *mid = find_middle(head);
    if (mid) printf("Middle Node Value = %d\n", mid->data);

    return 0;
}
