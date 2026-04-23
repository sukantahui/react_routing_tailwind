x = 1
def f():
    x = 2  # different namespace
    print(locals())
f()
print(globals())