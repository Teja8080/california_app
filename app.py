from flask import Flask, request, jsonify, render_template
import joblib

# Load trained model
obj = joblib.load('california1.joblib')

model = obj['Model']
columns = obj['Columns']

print("Model columns:", columns)

app = Flask(__name__)


# Home page
@app.route('/')
def main():
    return render_template('index.html')


# Prediction API
@app.route('/predict', methods=['GET'])
def predict():

    try:
        Input = []

        # Get all six values
        for i in columns:
            val = request.args.get(i)

            if val is None or val == "":
                return jsonify({
                    "success": False,
                    "error": f"Missing value for {i}"
                }), 400

            Input.append(float(val))

        # Make prediction
        out = model.predict([Input])

        prediction = float(out[0])

        return jsonify({
            "success": True,
            "prediction": prediction
        })

    except ValueError:
        return jsonify({
            "success": False,
            "error": "Please enter valid numerical values."
        }), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)