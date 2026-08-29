#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* get_intersection(Node *headA, Node *headB) {
    if (!headA || !headB) return NULL;
    Node *pA = headA, *pB = headB;
    while (pA != pB) {
        pA = (pA == NULL) ? headB : pA->next;
        pB = (pB == NULL) ? headA : pB->next;
    }
    return pA;
}

int main() {
    Node *common = (Node*)malloc(sizeof(Node)); common->data = 8;
    common->next = (Node*)malloc(sizeof(Node)); common->next->data = 10; common->next->next = NULL;

    Node *headA = (Node*)malloc(sizeof(Node)); headA->data = 4;
    headA->next = (Node*)malloc(sizeof(Node)); headA->next->data = 1; headA->next->next = common;

    Node *headB = (Node*)malloc(sizeof(Node)); headB->data = 5;
    headB->next = common;

    printf("--- Intersection Point of Two Linked Lists ---\n");
    Node *intersect = get_intersection(headA, headB);
    if (intersect) printf("Intersection Node Value = %d\n", intersect->data);

    return 0;
}
