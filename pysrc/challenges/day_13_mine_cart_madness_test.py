import pytest
import pysrc.challenges.day_13_mine_cart_madness as day13
import pysrc.utils as aoc_utils

SIMPLE_LOOP = [
    "/----\\",
    "|    |",
    "|    |",
    "\\----/"
]

SIMPLE_INTERSECTION = [
    "/-----\\",
    "|     |",
    "| /--+--\\",
    "|  |  |  |",
    "\\--+--/  |",
    "   |     |",
    "   \\-----/",
]

LINEAR_CRASH = ["|", "v", "|", "|", "|", "^", "|"]

LONGER_EXAMPLE = aoc_utils.read_file("day_13_test_input.txt", __file__)

class TestPartOne():

    def test_parse_simple_loop(self):
        result = day13.parse_track(SIMPLE_LOOP)
        assert result['track'] == {
            (0, 0): '/', (5, 0): '\\', (0, 3): '\\', (5, 3): '/'
        }

    def test_parse_simple_intersection(self):
        result = day13.parse_track(SIMPLE_INTERSECTION)
        assert result['track'] == {(0, 0): '/',
                                   (6, 0): '\\',
                                   (2, 2): '/',
                                   (5, 2): '+',
                                   (8, 2): '\\',
                                   (0, 4): '\\',
                                   (3, 4): '+',
                                   (6, 4): '/',
                                   (3, 6): '\\',
                                   (9, 6): '/'}

    def test_detect_collision(self):
        state = day13.parse_track(LINEAR_CRASH)
        for _ in range(2):
            result = day13.simulate_tick(state)
            state = result['state']

        assert result['collision'] == (0, 3)

    def test_eventual_collision(self):
        state = day13.parse_track(LONGER_EXAMPLE)
        result = day13.simulate_until_collision(state)

        assert result['collision'] == (7, 3)
