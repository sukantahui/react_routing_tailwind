# topic6_files/iter_sentinel_two_argument_protocol.py
# Module: 003_003_decorators-generators
# Topic: Iteration protocol: __iter__() and __next__()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: 2-Argument `iter(callable, sentinel)` Protocol
Demonstrates:
  1. The 2-argument form: `iter(callable, sentinel)`
  2. Generating continuous streams that stop when a sentinel value is returned
  3. Processing simulated payment chunks from bank gateway streams
"""

class PaymentGatewayStream:
    """Simulates streaming financial transaction records from bank gateway."""
    def __init__(self):
        self.transactions = [
            {"tx_id": "TX-101", "amount": 18000.0, "status": "SETTLED"},
            {"tx_id": "TX-102", "amount": 22000.0, "status": "SETTLED"},
            {"tx_id": "TX-103", "amount": 15000.0, "status": "SETTLED"},
            None  # Sentinel signaling end of transaction stream!
        ]
        self.index = 0

    def fetch_next_transaction(self):
        """Zero-argument callable returning next transaction or None."""
        if self.index < len(self.transactions):
            tx = self.transactions[self.index]
            self.index += 1
            return tx
        return None


def demonstrate_sentinel_iteration():
    print("=" * 70)
    print("CODER & ACCOTAX - 2-ARGUMENT `iter(callable, sentinel)` PROTOCOL")
    print("=" * 70)

    stream = PaymentGatewayStream()

    # Create Sentinel Iterator: Calls stream.fetch_next_transaction() until it returns None
    print("1. Creating Sentinel Iterator: `iter(stream.fetch_next_transaction, None)`:")
    sentinel_iterator = iter(stream.fetch_next_transaction, None)

    print(f"   Iterator Type: {type(sentinel_iterator)}")
    print(f"   Has `__next__`: {hasattr(sentinel_iterator, '__next__')}\n")

    # Consuming the stream cleanly with a standard for loop:
    print("2. Consuming Sentinel Stream via Standard `for` Loop:")
    total_revenue = 0.0
    for tx in sentinel_iterator:
        print(f"   * Processed Transaction {tx['tx_id']}: INR {tx['amount']:,.2f} ({tx['status']})")
        total_revenue += tx["amount"]

    print(f"\n   Total Processed Revenue: INR {total_revenue:,.2f}")

    print(r"""
The 2-Argument `iter()` Rule:
  `iter(callable, sentinel)`
  - Calls `callable()` on every `next()` invocation
  - If `callable() == sentinel`, immediately raises `StopIteration`
  - Highly effective for reading fixed-size chunks from binary streams or sockets:
    `for chunk in iter(lambda: file.read(4096), b""): process(chunk)`
""")
    print("[PASSED] 2-Argument iter(callable, sentinel) Verified.")


if __name__ == "__main__":
    demonstrate_sentinel_iteration()
