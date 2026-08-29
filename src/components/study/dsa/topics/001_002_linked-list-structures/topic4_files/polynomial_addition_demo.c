#include <stdio.h>
#include <stdlib.h>

// Polynomial term: coeff * x^exp
typedef struct Term {
    int coeff;
    int exp;
    struct Term *next;
} Term;

Term* createTerm(int coeff, int exp) {
    Term *t = (Term*)malloc(sizeof(Term));
    t->coeff = coeff;
    t->exp = exp;
    t->next = NULL;
    return t;
}

void insertTerm(Term **head, int coeff, int exp) {
    Term *newNode = createTerm(coeff, exp);
    if (*head == NULL || exp > (*head)->exp) {
        newNode->next = *head;
        *head = newNode;
        return;
    }
    Term *curr = *head;
    while (curr->next != NULL && curr->next->exp >= exp) {
        curr = curr->next;
    }
    newNode->next = curr->next;
    curr->next = newNode;
}

Term* addPolynomials(Term *p1, Term *p2) {
    Term *res = NULL;
    while (p1 && p2) {
        if (p1->exp > p2->exp) {
            insertTerm(&res, p1->coeff, p1->exp);
            p1 = p1->next;
        } else if (p1->exp < p2->exp) {
            insertTerm(&res, p2->coeff, p2->exp);
            p2 = p2->next;
        } else {
            int sumCoeff = p1->coeff + p2->coeff;
            if (sumCoeff != 0) insertTerm(&res, sumCoeff, p1->exp);
            p1 = p1->next;
            p2 = p2->next;
        }
    }
    while (p1) { insertTerm(&res, p1->coeff, p1->exp); p1 = p1->next; }
    while (p2) { insertTerm(&res, p2->coeff, p2->exp); p2 = p2->next; }
    return res;
}

void printPolynomial(Term *head, const char *name) {
    printf("Poly %s: ", name);
    while (head) {
        printf("%dx^%d%s", head->coeff, head->exp, head->next ? " + " : "");
        head = head->next;
    }
    printf("\n");
}

int main() {
    printf("=== Polynomial Addition using Linked Lists in C ===\n\n");
    Term *p1 = NULL, *p2 = NULL;

    // P1 = 5x^3 + 4x^2 + 2x^0
    insertTerm(&p1, 5, 3);
    insertTerm(&p1, 4, 2);
    insertTerm(&p1, 2, 0);

    // P2 = 5x^2 + 5x^1 + 1x^0
    insertTerm(&p2, 5, 2);
    insertTerm(&p2, 5, 1);
    insertTerm(&p2, 1, 0);

    printPolynomial(p1, "P1");
    printPolynomial(p2, "P2");

    Term *sum = addPolynomials(p1, p2);
    printPolynomial(sum, "Sum (P1 + P2)");

    return 0;
}
