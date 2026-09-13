#include <stdio.h>
#include <stdlib.h>

/* Simulating Header 1: Vector2D with Standard Header Guard */
#ifndef VECTOR2D_H
#define VECTOR2D_H

typedef struct {
    float x;
    float y;
} Vector2D;

static inline Vector2D vector_add(Vector2D a, Vector2D b) {
    Vector2D result = { a.x + b.x, a.y + b.y };
    return result;
}

#endif /* VECTOR2D_H */

/* Simulating duplicate inclusion of Vector2D (e.g. via nested includes) */
#ifndef VECTOR2D_H
#define VECTOR2D_H
/* This block is successfully ignored by the preprocessor! */
typedef struct { float x; float y; } Vector2D; /* Would cause redefinition error without guards */
#endif

/* Simulating Header 2: Transform with #pragma once alternative */
#ifndef TRANSFORM_H
#define TRANSFORM_H

typedef struct {
    Vector2D position;
    float rotation;
    float scale;
} Transform;

#endif /* TRANSFORM_H */

int main(void) {
    printf("=====================================================\n");
    printf("  Header Guard Mechanics: Preventing Type Redefinitions\n");
    printf("=====================================================\n\n");

    printf(">>> 1. Creating Structs Defined Behind Include Guards:\n");
    Vector2D posA = {10.5f, 20.0f};
    Vector2D posB = {5.5f, -4.0f};
    Vector2D total = vector_add(posA, posB);

    printf("    Vector A: (%.2f, %.2f)\n", posA.x, posA.y);
    printf("    Vector B: (%.2f, %.2f)\n", posB.x, posB.y);
    printf("    Sum (A+B): (%.2f, %.2f)\n\n", total.x, total.y);

    printf(">>> 2. Composite Transform Object:\n");
    Transform entity = { total, 45.0f, 1.0f };
    printf("    Entity Position: (%.2f, %.2f)\n", entity.position.x, entity.position.y);
    printf("    Entity Rotation: %.1f deg\n", entity.rotation);
    printf("    Entity Scale   : %.1fx\n", entity.scale);

    printf("\n>>> 3. Multiple Inclusion Protection:\n");
    printf("    VECTOR2D_H guard prevented duplicate typedef struct redefinitions.\n");

    printf("\n=== Header Guard Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
