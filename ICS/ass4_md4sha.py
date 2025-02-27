import random


def is_prime(num):
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True


def generate_random_prime(lower, upper):
    prime = random.randint(lower, upper)
    while not is_prime(prime):
        prime = random.randint(lower, upper)
    return prime


# Function to calculate GCD of two numbers
def gcd_calc(a, b):
    while b != 0:
        a, b = b, a % b
    return a


# Extended Euclidean Algorithm to find modular inverse
def mod_inverse(e, fn):
    t, new_t = 0, 1
    r, new_r = fn, e
    while new_r != 0:
        quotient = r // new_r
        t, new_t = new_t, t - quotient * new_t
        r, new_r = new_r, r - quotient * new_r
    if r > 1:
        return -1  # No modular inverse exists
    if t < 0:
        t += fn
    return t


# Function to perform modular exponentiation
def modular_exponentiation(base, exponent, modulus):
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % modulus
        exponent = exponent >> 1
        base = (base * base) % modulus
    return result


# Function to encrypt message
def encrypt_rsa(M, pub_key):
    C = modular_exponentiation(M, pub_key[0], pub_key[1])
    print(f"Ciphertext is: {C}")
    return C


# Function to decrypt message
def decrypt(C, priv_key):
    Dec = modular_exponentiation(C, priv_key[0], priv_key[1])
    print(f"Plaintext after Decryption is: {Dec}")


# Function to set up RSA parameters and perform encryption/decryption
def get_data(p, q, upper, lower):
    n = p * q
    fn = (p - 1) * (q - 1)

    # Select e such that gcd(fn, e) = 1 and 1 < e < fn
    e = random.randint(lower, upper)
    while gcd_calc(fn, e) != 1 or e >= fn or e <= 1:
        e = random.randint(lower, upper)

    print(f"e is: {e}")
    d = mod_inverse(e, fn)

    if d != -1:
        pub_key = (e, n)
        priv_key = (d, n)

        M = int(input(f"Enter a Plaintext less than {n}: "))

        # Ensure plaintext is less than modulus
        while M >= n:
            M = int(input(f"Enter a Plaintext less than {n}: "))

        C = encrypt_rsa(M, pub_key)
        decrypt(C, priv_key)
    else:
        print("No value of d found! Exiting...")
        exit(0)


if __name__ == "__main__":
    # Seed the random number generator with the current time
    random.seed()

    k = generate_random_prime(1, 100)
    j = generate_random_prime(1, 100)

    while k == j:
        print(f"Both prime numbers are same!\n"f"k:{k}\tj:{j}\tRegenerating.....")
        j = generate_random_prime(1, 100)

    print(f"Prime k: {k}")
    print(f"Prime j: {j}")

    get_data(k, j, 100, 1)
