import re
from typing import Dict, List, NamedTuple

Pots = Dict[int, bool]
Rules = Dict[str, bool]


class Input(NamedTuple):
    initial_state: Pots
    rules: Rules


test_input = """initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #""".splitlines()

rule_regex = re.compile("([#.]{5}) => ([#.])")


def parse_input(lines: List[str]):
    initial_state_match = re.search("initial state: ([#.]+)", lines[0])
    if not initial_state_match:
        raise Exception(
            "Expected first line to list initial state, but instead was " + lines[0])
    initial_state_str = initial_state_match.group(1)
    initial_state = parse_generation(initial_state_str)

    if (lines[1] != ""):
        raise Exception(
            "Expected second line to be blank, but was " + lines[1])

    rule_lines = lines[2:]

    rules = dict()
    for rule_line in rule_lines:
        match = rule_regex.search(rule_line)
        if not match:
            raise Exception("Expected line to be a rule, but was " + rule_line)
        rules[match.group(1)] = match.group(2) == "#"

    return Input(initial_state=initial_state, rules=rules)


def parse_generation(input, leftmost_pot=0):
    result = dict()
    for i, char in enumerate(input):
        result[leftmost_pot + i] = char == '#'
    return result


def stringify_pots(pots: Pots):
    numbers = pots.keys()
    lowest_number, highest_number = min(numbers), max(numbers)
    output_list = list()

    for i in range(lowest_number, highest_number + 1):
        output_list.append('#' if pots[i] else '.')

    return "".join(output_list)


def get_pattern_slice(pots: Pots, index: int):
    slice = dict()
    for i in range(index - 2, index + 3):
        slice[i] = pots.get(i, False)
    return stringify_pots(slice)


def simulate_generation(pots: Pots, rules: Rules):
    numbers = pots.keys()
    # because the pattern-matching includes the two pots to the side of each pot, it's possible that
    # pots outside of the range represented could be affected
    lowest_number, highest_number = min(numbers) - 2, max(numbers) + 2

    next_generation = dict()

    for i in range(lowest_number, highest_number + 1):
        pattern_slice = get_pattern_slice(pots, i)
        pattern_result = rules.get(pattern_slice, False)
        next_generation[i] = pattern_result

    return next_generation


def get_sum(input: List[str]):
    parsed_input = parse_input(input)
    state = parsed_input.initial_state

    for _ in range(20):
        state = simulate_generation(state, parsed_input.rules)

    return sum(i for i,v in state.items() if v)
