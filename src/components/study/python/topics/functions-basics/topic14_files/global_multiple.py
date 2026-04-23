a, b = 1, 2
def update():
    global a, b
    a, b = b, a
update()
print(a, b)