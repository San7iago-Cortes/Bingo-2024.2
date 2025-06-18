from flask import Flask, render_template, jsonify, request
from bingo_card import generate_bingo_card
import random

app = Flask(__name__)

participants = []
used_numbers = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_card', methods=['POST'])
def generate_card():
    name = request.form.get('name')
    if not name:
        return jsonify({'status': 'error', 'message': 'Debe proporcionar un nombre para el participante.'})

    # Verificar si el nombre ya existe
    for participant in participants:
        if participant['name'] == name:
            return jsonify({'status': 'error', 'message': f'El participante con el nombre "{name}" ya existe.'})

    card = generate_bingo_card(name)
    participant_data = {
        'name': name,
        'card': card,
        'marked_numbers': []
    }
    participants.append(participant_data)

    return jsonify({'status': 'success', 'message': f'Tabla generada para {name}.', 'card': card})

@app.route('/extract_number')
def extract_number():
    global used_numbers
    all_numbers = list(range(1, 76))
    remaining_numbers = [n for n in all_numbers if n not in used_numbers]
    
    if not remaining_numbers:
        return jsonify({'status': 'game_over', 'message': 'Todos los números han sido extraídos.'})

    # Corrección aquí: se usa random.choice() para evitar errores de índice
    extracted_number = random.choice(remaining_numbers)
    used_numbers.append(extracted_number)

    winner = check_for_winner()
    if winner:
        return jsonify({'status': 'winner', 'winner': winner})
    else:
        return jsonify({'status': 'success', 'number': extracted_number})

def check_for_winner():
    for participant in participants:
        card_numbers = (
            participant['card']['B'] +
            participant['card']['I'] +
            participant['card']['N'] +
            participant['card']['G'] +
            participant['card']['O']
        )
        if all(num in used_numbers or num == 'FREE' for num in card_numbers):
            return participant['name']
    return None

@app.route('/reset')
def reset_game():
    global participants, used_numbers
    participants = []
    used_numbers = []
    return jsonify({'status': 'success', 'message': 'El juego ha sido reiniciado.'})

if __name__ == '__main__':
    app.run(debug=True)
