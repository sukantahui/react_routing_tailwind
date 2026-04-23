class Temp:
    def __del__(self):
        print("destroyed")
obj = Temp()
del obj