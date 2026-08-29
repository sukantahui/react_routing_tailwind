#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef struct XNode {
    int data;
    struct XNode *npx; // XOR of prev and next pointers
} XNode;

XNode* XOR(XNode *a, XNode *b) {
    return (XNode*)((uintptr_t)(a) ^ (uintptr_t)(b));
}

XNode* insert_xor(XNode *head, int val) {
    XNode *n = (XNode*)malloc(sizeof(XNode));
    n->data = val;
    n->npx = XOR(NULL, head);

    if (head) {
        XNode *next = XOR(NULL, head->npx);
        head->npx = XOR(n, next);
    }
    return n;
}

void print_xor(XNode *head) {
    XNode *curr = head, *prev = NULL, *next;
    printf("XOR List Forward: ");
    while (curr) {
        printf("%d <-> ", curr->data);
        next = XOR(prev, curr->npx);
        prev = curr;
        curr = next;
    }
    printf("NULL\n");
}

int main() {
    XNode *head = NULL;
    printf("--- Memory-Efficient XOR Doubly Linked List ---\n");
    head = insert_xor(head, 30);
    head = insert_xor(head, 20);
    head = insert_xor(head, 10);

    print_xor(head);
    return 0;
}
