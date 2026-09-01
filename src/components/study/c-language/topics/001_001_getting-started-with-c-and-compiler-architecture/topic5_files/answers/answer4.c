/**
 * ============================================================================
 * Project 4: Circle, Cylinder & Sphere Geometric Measurements Calculator
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define PI 3.14159265358979323846

int main(void) {
    printf("===================================================================\n");
    printf("     GEOMETRIC MENSURATION CALCULATOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    double radius = 7.0;
    double height = 15.0;

    /* 1. 2D Circle Calculations */
    double circleCircumference = 2.0 * PI * radius;
    double circleArea = PI * radius * radius;

    /* 2. 3D Cylinder Calculations */
    double cylinderSurfaceArea = 2.0 * PI * radius * (radius + height);
    double cylinderVolume = PI * radius * radius * height;

    /* 3. 3D Sphere Calculations */
    double sphereSurfaceArea = 4.0 * PI * radius * radius;
    double sphereVolume = (4.0 / 3.0) * PI * radius * radius * radius;

    printf("INPUT PARAMETERS:\n");
    printf("  • Primary Radius (r) : %8.2f units\n", radius);
    printf("  • Height (h)         : %8.2f units\n", height);
    printf("  • Constant PI        : %18.15f\n\n", PI);

    printf("--- [1] 2D CIRCLE ---\n");
    printf("  • Circumference (2*pi*r)     : %10.4f units\n", circleCircumference);
    printf("  • Surface Area (pi*r^2)      : %10.4f sq units\n\n", circleArea);

    printf("--- [2] 3D CYLINDER ---\n");
    printf("  • Total Surface Area         : %10.4f sq units\n", cylinderSurfaceArea);
    printf("  • Internal Volume (pi*r^2*h) : %10.4f cubic units\n\n", cylinderVolume);

    printf("--- [3] 3D SPHERE ---\n");
    printf("  • Total Surface Area         : %10.4f sq units\n", sphereSurfaceArea);
    printf("  • Internal Volume (4/3*pi*r3): %10.4f cubic units\n", sphereVolume);

    printf("===================================================================\n");
    return 0;
}
