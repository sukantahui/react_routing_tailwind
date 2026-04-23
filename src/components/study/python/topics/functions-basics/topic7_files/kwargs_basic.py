# kwargs_basic.py
# Basic usage of **kwargs

def print_info(**info):
    """Prints all keyword arguments as key: value pairs."""
    print(f"Received {len(info)} keyword arguments:")
    for key, value in info.items():
        print(f"  {key}: {value}")

print_info(name="Swadeep", age=17, city="Barrackpore")
print_info(product="Laptop", price=1200, in_stock=True)
print_info()  # no kwargs → empty dict

def greet(**person):
    """Greet a person using keyword arguments."""
    if 'name' in person:
        greeting = person.get('greeting', 'Hello')
        print(f"{greeting}, {person['name']}!")
    else:
        print("No name provided.")

greet(name="Tuhina")
greet(name="Abhronila", greeting="Namaste")
greet(greeting="Hi")  # missing name