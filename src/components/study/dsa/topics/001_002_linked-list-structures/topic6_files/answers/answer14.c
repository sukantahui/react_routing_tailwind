#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* find_cycle_start(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            Node *entry = head;
            while (entry != slow) {
                entry = entry->next;
                slow = slow->next;
            }
            return entry;
        }
    }
    return NULL;
}

int main() {
    Node *n1 = (Node*)malloc(sizeof(Node)); n1->data = 10;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 20;
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 30;
    Node *n4 = (Node*)malloc(sizeof(Node)); n4->data = 40;
    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n2; // Cycle at n2

    printf("--- Cycle Start Node Finder ---\n");
    Node *start = find_cycle_start(n1);
    if (start) printf("Cycle starts at Node with Value = %d\n", start->data);

    return 0;
}
