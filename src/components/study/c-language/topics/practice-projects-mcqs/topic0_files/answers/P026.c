#include <stdio.h>
#define PI_DEFINE 3.14159

int main() {
    const double PI_CONST = 3.14159;
    double radius, area_const, area_define;
    printf("Enter radius: ");
    scanf("%lf", &radius);
    area_const = PI_CONST * radius * radius;
    area_define = PI_DEFINE * radius * radius;
    printf("Area (using const) = %f\n", area_const);
    printf("Area (using #define) = %f\n", area_define);
    return 0;
}
