import pickle
import os

model_name = ['Flags', 'Category', 'Intent']
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = {}
for i in model_name:
    model_path = os.path.join(BASE_DIR, 'Model', f'{i}.pkl')
    model_path = os.path.abspath(model_path)
    with open(model_path, 'rb') as f:
        model[i] = pickle.load(f)

def prediction(text, model_name):
    if model_name == 'Flags':
        return model['Flags'].predict([text])[0]
    elif model_name == 'Category':
        return model['Category'].predict([text])[0]
    elif model_name == 'Intent':
        return model['Intent'].predict([text])[0]