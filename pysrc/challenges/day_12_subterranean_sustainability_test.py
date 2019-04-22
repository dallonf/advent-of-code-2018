import pytest
from .day_12_subterranean_sustainability import parse_generation, stringify_generation

class TestPartOne:
    def test_parse_generation(self):
        input = "#..#.#..##......###...###"
        assert stringify_generation(parse_generation(input))
