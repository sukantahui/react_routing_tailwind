#include <stdio.h>
#include <stdlib.h>

// Sparse Matrix Element (3-Tuple Representation: row, col, value)
typedef struct {
    int row;
    int col;
    int value;
} Element;

typedef struct {
    int rows;
    int cols;
    int numNonZero;
    Element *elements;
} SparseMatrix;

void createSparseMatrix(SparseMatrix *s, int rows, int cols, int numNonZero) {
    s->rows = rows;
    s->cols = cols;
    s->numNonZero = numNonZero;
    s->elements = (Element *)malloc(numNonZero * sizeof(Element));
}

void printSparseMatrix(const SparseMatrix *s) {
    printf("Sparse Matrix 3-Tuple Representation (Non-zero count: %d):\n", s->numNonZero);
    printf("Row \t Col \t Value\n");
    printf("------------------------\n");
    for (int i = 0; i < s->numNonZero; i++) {
        printf("%d \t %d \t %d\n", s->elements[i].row, s->elements[i].col, s->elements[i].value);
    }
    printf("\n");
}

void freeSparseMatrix(SparseMatrix *s) {
    free(s->elements);
    s->elements = NULL;
}

int main() {
    printf("=== Sparse Matrix 3-Tuple Storage in C ===\n\n");
    SparseMatrix s;
    createSparseMatrix(&s, 4, 5, 3);

    s.elements[0] = (Element){0, 1, 10};
    s.elements[1] = (Element){1, 3, 20};
    s.elements[2] = (Element){3, 2, 30};

    printSparseMatrix(&s);
    freeSparseMatrix(&s);

    return 0;
}
