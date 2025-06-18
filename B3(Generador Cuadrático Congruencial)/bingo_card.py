def hash_name(name):
    hash_value = 0
    for char in name:
# El número 31 es un multiplicador comúnmente utilizado en funciones de hash debido a sus buenas propiedades de dispersión
        hash_value = (hash_value * 31 + ord(char)) % 2**31
    return hash_value

def generate_bingo_card(name):
    card = {}

    columns = {
        'B': list(range(1, 16)),
        'I': list(range(16, 31)),
        'N': list(range(31, 46)),
        'G': list(range(46, 61)),
        'O': list(range(61, 76))
    }

# Obtener la semilla única basada en el nombre del participante
    global seed
    seed = hash_name(name)
    m = 2**31 - 1
    a = 1103515245
    c = 12345
    b = 123

    def quadratic_congruential():
        global seed
        seed = (a * seed + b * (seed ** 2) + c) % m
        return seed

    for letter, numbers in columns.items():
        selected_numbers = []
        while len(selected_numbers) < 5:
            random_int = quadratic_congruential()
            selected_number = numbers[random_int % len(numbers)]
            if selected_number not in selected_numbers:
                selected_numbers.append(selected_number)
        
        card[letter] = selected_numbers

    card['N'][2] = 'FREE'

    return card
