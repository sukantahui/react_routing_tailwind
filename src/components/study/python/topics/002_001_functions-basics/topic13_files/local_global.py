x = 100  # global

def show():
    y = 50  # local
    print(f"Inside function: x={x}, y={y}")

show()
print(f"Outside: x={x}")
# print(y)  # NameError