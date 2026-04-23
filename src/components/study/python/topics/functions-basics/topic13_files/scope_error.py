count = 0
def increment():
    count += 1  # UnboundLocalError – count is local because of assignment
increment()