/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic 5: Example & Discussion — Sparse Polynomial Addition & Multiplication
 *          using Sorted Linked Nodes
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct Term {
    int coeff;
    int exp;
    struct Term *next;
} Term;

Term* createTerm(int coeff, int exp) {
    Term *t = (Term *)malloc(sizeof(*t));
    if (!t) exit(EXIT_FAILURE);
    t->coeff = coeff;
    t->exp = exp;
    t->next = NULL;
    return t;
}

// Insert term keeping exponents sorted DESCENDING and combining like exponents!
void insertTermSorted(Term **headRef, int coeff, int exp) {
    if (coeff == 0) return; // Never store zero-coefficient terms in a sparse list!

    // Case 1: Empty list or new exponent is larger than head's exponent
    if (*headRef == NULL || exp > (*headRef)->exp) {
        Term *newTerm = createTerm(coeff, exp);
        newTerm->next = *headRef;
        *headRef = newTerm;
        return;
    }

    Term *curr = *headRef;
    Term *prev = NULL;
    while (curr != NULL && curr->exp > exp) {
        prev = curr;
        curr = curr->next;
    }

    // Case 2: Matching exponent found -> add coefficients in-place!
    if (curr != NULL && curr->exp == exp) {
        curr->coeff += coeff;
        if (curr->coeff == 0) {
            // Terms cancelled out -> unlink and free!
            if (prev == NULL) *headRef = curr->next;
            else prev->next = curr->next;
            free(curr);
        }
        return;
    }

    // Case 3: Insert new term between prev and curr
    Term *newTerm = createTerm(coeff, exp);
    newTerm->next = curr;
    prev->next = newTerm;
}

// Polynomial Addition: Two-pointer merge in O(N + M) time
Term* addPolynomials(const Term *p1, const Term *p2) {
    Term *res = NULL;
    Term *tail = NULL;

    while (p1 != NULL && p2 != NULL) {
        int c = 0, e = 0;
        if (p1->exp > p2->exp) {
            c = p1->coeff; e = p1->exp; p1 = p1->next;
        } else if (p1->exp < p2->exp) {
            c = p2->coeff; e = p2->exp; p2 = p2->next;
        } else {
            c = p1->coeff + p2->coeff;
            e = p1->exp;
            p1 = p1->next;
            p2 = p2->next;
        }
        if (c != 0) {
            Term *node = createTerm(c, e);
            if (!res) res = tail = node;
            else { tail->next = node; tail = node; }
        }
    }
    while (p1 != NULL) {
        Term *node = createTerm(p1->coeff, p1->exp);
        if (!res) res = tail = node; else { tail->next = node; tail = node; }
        p1 = p1->next;
    }
    while (p2 != NULL) {
        Term *node = createTerm(p2->coeff, p2->exp);
        if (!res) res = tail = node; else { tail->next = node; tail = node; }
        p2 = p2->next;
    }
    return res;
}

// Sparse Polynomial Multiplication: Multiply every pair & combine like exponents
Term* multiplyPolynomials(const Term *p1, const Term *p2) {
    Term *product = NULL;
    for (const Term *a = p1; a != NULL; a = a->next) {
        for (const Term *b = p2; b != NULL; b = b->next) {
            insertTermSorted(&product, a->coeff * b->coeff, a->exp + b->exp);
        }
    }
    return product;
}

void printPoly(const Term *p, const char *label) {
    printf("%s = ", label);
    if (!p) { printf("0\n"); return; }
    while (p != NULL) {
        printf("%dx^%d", p->coeff, p->exp);
        if (p->next != NULL) printf(" + ");
        p = p->next;
    }
    printf("\n");
}

void freePoly(Term **headRef) {
    Term *curr = *headRef;
    while (curr != NULL) {
        Term *tmp = curr->next;
        free(curr);
        curr = tmp;
    }
    *headRef = NULL;
}

int main(void) {
    Term *p1 = NULL, *p2 = NULL;

    // P1(x) = 5x^100 + 4x^2 + 2
    insertTermSorted(&p1, 5, 100);
    insertTermSorted(&p1, 4, 2);
    insertTermSorted(&p1, 2, 0);

    // P2(x) = 3x^100 - 4x^2 + 7x + 1
    insertTermSorted(&p2, 3, 100);
    insertTermSorted(&p2, -4, 2);
    insertTermSorted(&p2, 7, 1);
    insertTermSorted(&p2, 1, 0);

    printPoly(p1, "P1(x)");
    printPoly(p2, "P2(x)");

    Term *sum = addPolynomials(p1, p2);
    printPoly(sum, "P1 + P2");

    Term *prod = multiplyPolynomials(p1, p2);
    printPoly(prod, "P1 * P2");

    freePoly(&p1);
    freePoly(&p2);
    freePoly(&sum);
    freePoly(&prod);
    return 0;
}
