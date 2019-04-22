from typing import Dict

Generation = Dict[int, bool]


def parse_generation(input, leftmost_pot=0):
    result = dict()
    for i, char in enumerate(input):
        result[leftmost_pot + i] = char == '#'
    return result


def stringify_generation(generation: Generation):
    numbers = generation.keys()
    lowest_number, highest_number = min(numbers), max(numbers)
    output_list = list()

    for i in range(lowest_number, highest_number + 1):
        output_list.append('#' if generation[i] else '.')

    return "".join(output_list)
