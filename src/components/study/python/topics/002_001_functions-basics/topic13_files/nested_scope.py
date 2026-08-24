def outer():
    outer_var = "outer"
    def inner():
        inner_var = "inner"
        print(outer_var)  # can access enclosing
    inner()
outer()