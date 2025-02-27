def xor_operation(a, b):
    """Perform XOR operation between two binary strings."""
    return ''.join(str(int(x) ^ int(y)) for x, y in zip(a, b))


def or_operation(a, b):
    """Perform OR operation between two binary strings."""
    return ''.join(str(int(x) | int(y)) for x, y in zip(a, b))


def feistel(data, key):
    length = len(data)
    mid = length // 2
    L0 = data[:mid]
    R0 = data[mid:]

    L1 = R0
    t = or_operation(R0, key)
    R1 = xor_operation(L0, t)
    return L1, R1


def feistel_decode(data, key):
    length = len(data)
    mid = length // 2
    L1 = data[:mid]
    R1 = data[mid:]

    R0 = L1
    t = or_operation(L1, key)
    L0 = xor_operation(t, R1)
    return L0, R0


def main():
    data = input("Enter 8 bit binary data")
    key = input("Enter 4  bit key")

    if len(data) != 8:
        print("Data must be 8 bit binary number")
        return

    if len(key) != 4:
        print("Key must be 4 bit binary!")
        return

    L1, R1 = feistel(data, key)
    cipher_text = L1 + R1
    print("Cipher text: ", cipher_text)

    L0, R0 = feistel_decode(cipher_text, key)
    decoded_data = L0 + R0
    print("Decoded text: ", decoded_data)


if __name__ == "__main__":
    main()
