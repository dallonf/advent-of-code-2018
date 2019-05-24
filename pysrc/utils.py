import os

def read_file(filename, src_path):
    input_filepath = os.path.join(os.path.dirname(src_path), filename)
    with open(input_filepath, "r") as file:
        return [line.rstrip('\n') for line in file.readlines()]