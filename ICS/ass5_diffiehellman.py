import random


def isPrime(prime):
    for i in [2, 3, 5, 7]:
        if ((prime % i) == 0) and prime > 7:
            return 0
        elif (prime == 5 or prime == 7 or prime == 3):
            return 1
    else:
        return 1


def gcalc(prime):
    gvals = []
    for g in range(2, prime):
        myval = set()
        for i in range(1, prime):
            myval.add((g ** i) % prime)
        if len(myval) == prime - 1:
            gvals.append(g)
    print("Valid g values are: ", gvals)
    random_g = random.choice(gvals)
    print("Selected value of g is: ", random_g)
    return random_g


def calcX(prime):
    Xa = random.randint(1, prime - 1)
    Xb = random.randint(1, prime - 1)
    while Xa == Xb:
        Xb = random.randint(1, prime - 1)
    print("Xa =", Xa, "\nXb =", Xb)
    return Xa, Xb


def calcY(randg, prime, Xa, Xb):
    Ya = pow(randg, Xa, prime)
    Yb = pow(randg, Xb, prime)
    print("Ya =", Ya, "\nYb =", Yb)
    return Ya, Yb


def calcK(prime, Xa, Xb, Ya, Yb):
    k1 = pow(Yb, Xa, prime)
    k2 = pow(Ya, Xb, prime)
    if k1 == k2:
        print("Success! The shared secret key is:", k1)
        return k1
    else:
        print("Failure: Keys do not match.")
        return None


def main():
    prime = int(input("Enter a prime number: "))
    while not isPrime(prime):
        prime = int(input("Invalid input. Enter a prime number: "))

    randg = gcalc(prime)
    Xa, Xb = calcX(prime)
    Ya, Yb = calcY(randg, prime, Xa, Xb)
    calcK(prime, Xa, Xb, Ya, Yb)


if __name__ == "__main__":
    main()
