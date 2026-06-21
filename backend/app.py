from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow React frontend (localhost:5173) to call this API

# Load the pre-trained model
model = joblib.load('heart_risk_prediction_regression_model.sav')


@app.route('/')
def health():
    return jsonify({"status": "Heart Risk Predictor API is running"})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        name   = data['name']
        gender = float(data['gender'])
        age    = float(data['age'])
        tc     = float(data['tc'])
        hdl    = float(data['hdl'])
        sbp    = float(data['sbp'])
        smoke  = float(data['smoke'])
        bpm    = float(data['bpm'])
        diab   = float(data['diab'])

        # Build feature array (sbp is not used by model — kept for parity with original)
        test_data = np.array([gender, age, tc, hdl, smoke, bpm, diab]).reshape(1, -1)

        prediction = model.predict(test_data)
        risk = round(float(prediction[0][0]), 2)

        return jsonify({"name": name, "risk": risk})

    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
