import pickle
import os

model_name = ['Flags', 'Category', 'Intent']
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_cache = {}
def load_model(model_name):
    if model_name not in model_cache:
        model_path = os.path.join(BASE_DIR, 'Model', f'{model_name}.pkl')
        with open(model_path, 'rb') as f:
            model_cache[model_name] = pickle.load(f)
    return model_cache[model_name]

def prediction(text, model_name):
    model = load_model(model_name)
    return model.predict([text])[0]