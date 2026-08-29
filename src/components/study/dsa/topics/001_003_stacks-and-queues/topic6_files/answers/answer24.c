#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct ENode {
    char data;
    struct ENode *left, *right;
} ENode;

ENode* create_node(char val) {
    ENode *n = (ENode*)malloc(sizeof(ENode));
    n->data = val; n->left = NULL; n->right = NULL;
    return n;
}

ENode* build_expression_tree(const char *postfix) {
    ENode *stack[100]; int top = -1;
    for (int i = 0; postfix[i] != '\0'; i++) {
        char ch = postfix[i];
        if (isalnum(ch)) {
            stack[++top] = create_node(ch);
        } else {
            ENode *n = create_node(ch);
            n->right = stack[top--];
            n->left = stack[top--];
            stack[++top] = n;
        }
    }
    return stack[top];
}

int eval_tree(ENode *root) {
    if (!root->left && !root->right) return root->data - '0';
    int l = eval_tree(root->left);
    int r = eval_tree(root->right);
    switch (root->data) {
        case '+': return l + r;
        case '-': return l - r;
        case '*': return l * r;
        case '/': return l / r;
    }
    return 0;
}

int main() {
    const char *postfix = "53+82/*"; // (5+3) * (8/2) = 8 * 4 = 32
    printf("--- Expression Tree Construction & Evaluation ---\nPostfix: %s\n", postfix);
    ENode *root = build_expression_tree(postfix);
    printf("Tree Evaluated Result = %d\n", eval_tree(root));
    return 0;
}
