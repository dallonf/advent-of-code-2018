import pytest
import os
import pysrc.challenges.day_12_subterranean_sustainability as day12

input_filepath = os.path.join(os.path.dirname(__file__), "day_12_input.txt")
with open(input_filepath, "r") as file:
    puzzle_input = [line.strip() for line in file.readlines()]


class TestPartOne:
    def test_parse_generation(self):
        input = "#..#.#..##......###...###"
        assert day12.stringify_pots(day12.parse_generation(input))

    def test_simulate_generation(self):
        parsed_input = day12.parse_input(day12.test_input)
        result = day12.simulate_generation(
            parsed_input.initial_state, parsed_input.rules)
        assert day12.stringify_pots(result) == "..#...#....#.....#..#..#..#.."

    def test_get_sum(self):
        assert day12.get_sum(day12.test_input) == 325

    def test_answer(self):
        assert day12.get_sum(puzzle_input) == 4200