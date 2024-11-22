from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure the upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create folder if it doesn't exist
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if file is included in the request
        if 'file' not in request.files:
            return jsonify({'message': 'No file part'}), 400

        file = request.files['file']
        name = request.form.get('name')
        age = request.form.get('age')

        # Validate inputs
        if not name or not age:
            return jsonify({'message': 'Name and age are required.'}), 400

        if not age.isdigit():
            return jsonify({'message': 'Age must be a number.'}), 400

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        # Save file to the server
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        return jsonify({'message': f"Data received: Name - {name}, Age - {age}, File saved as {file.filename}"}), 200

    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
