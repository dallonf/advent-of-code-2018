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


def stringify_pots(pots: Pots, with_index=False):
    numbers = pots.keys()
    lowest_number, highest_number = min(numbers), max(numbers)
    output_list = list()

    for i in range(lowest_number, highest_number + 1):
        output_list.append('#' if pots.get(i, False) else '.')

    output = "".join(output_list)

    if with_index:
        return str(lowest_number) + ":" + output
    else:
        return output


def get_pattern_slice(pots: Pots, index: int):
    slice = dict()
    for i in range(index - 2, index + 3):
        slice[i] = pots.get(i, False)
    return stringify_pots(slice)


def simulate_generation(pots: Pots, rules: Rules):
    numbers = pots.keys()
    # because the pattern-matching includes the two pots to the side of each pot, it's possible that
    # pots outside of the range represented could be affected
    # assumption: there will never be a pattern of "..#..", which would affect an infinite number of pots
    lowest_number, highest_number = min(numbers) - 2, max(numbers) + 2

    next_generation = dict()

    for i in range(lowest_number, highest_number + 1):
        pattern_slice = get_pattern_slice(pots, i)
        pattern_result = rules.get(pattern_slice, False)
        if (pattern_result):
            # don't actually save "False" to the list
            next_generation[i] = pattern_result

    return next_generation


def get_sum(input: List[str], generations=20):
    parsed_input = parse_input(input)
    state = parsed_input.initial_state

    generations_simulated = 0

    def get_index(pots: Pots):
        return min(pots.keys())

    for _ in range(generations):
        prev_state = state
        state = simulate_generation(state, parsed_input.rules)
        generations_simulated += 1
        # If the pattern has not changed, bail out of the loop; it will never change again
        # Assumption: every input will eventually reach a stable state
        # It's theoretically possible that it could enter a loop between states
        # But I don't have any inputs that could result in this behavior
        # However, it IS quite likely that the pattern, although unchanging, may slowly migrate across the space
        if stringify_pots(prev_state) == stringify_pots(state):
            # figure out how much it's going to move each iteration
            prev_index = get_index(prev_state)
            new_index = get_index(state)
            delta = new_index - prev_index
            # figure out how much it's going to move in the remaining generations
            full_distance = delta*(generations-generations_simulated)
            state = { (i + full_distance): v for i, v in state.items() }
            break

    return sum(i for i, v in state.items() if v)
