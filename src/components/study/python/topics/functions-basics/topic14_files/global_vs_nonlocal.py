def outer():
    x = "outer"
    def inner():
        nonlocal x  # modifies enclosing variable
        x = "inner"
    inner()
    print(x)
outer()