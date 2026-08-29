#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} Vector;

Vector* create_vector(size_t initial_capacity) {
    Vector *vec = (Vector*)malloc(sizeof(Vector));
    if (!vec) return NULL;
    vec->data = (int*)malloc(initial_capacity * sizeof(int));
    if (!vec->data) {
        free(vec);
        return NULL;
    }
    vec->size = 0;
    vec->capacity = initial_capacity;
    return vec;
}

void push_back(Vector *vec, int value) {
    if (vec->size == vec->capacity) {
        size_t new_cap = vec->capacity * 2;
        int *temp = (int*)realloc(vec->data, new_cap * sizeof(int));
        if (!temp) {
            printf("Error: Reallocation failed.\n");
            return;
        }
        vec->data = temp;
        vec->capacity = new_cap;
    }
    vec->data[vec->size++] = value;
}

void print_vector(const Vector *vec) {
    printf("Vector Elements (Size=%zu, Capacity=%zu): [ ", vec->size, vec->capacity);
    for (size_t i = 0; i < vec->size; i++) {
        printf("%d ", vec->data[i]);
    }
    printf("]\n");
}

void free_vector(Vector *vec) {
    if (vec) {
        free(vec->data);
        free(vec);
    }
}

int main() {
    printf("--- Dynamic Array (Vector) Buffer Simulation ---\n");
    Vector *v = create_vector(2);
    
    push_back(v, 10);
    push_back(v, 20);
    print_vector(v);

    printf("Pushing element 30 (Triggers Capacitous Doubling)...\n");
    push_back(v, 30);
    print_vector(v);

    push_back(v, 40);
    push_back(v, 50);
    print_vector(v);

    free_vector(v);
    return 0;
}
