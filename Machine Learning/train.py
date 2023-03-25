import pandas as pd

def prepare_train_test_datasets():
    df_train = pd.read_table('dataset/fr/train.tsv')
    df_test = pd.read_table('dataset/fr/test.tsv')


    