import pytest
import pysrc.challenges.day_13_mine_cart_madness as day13


class TestPartOne():
    SIMPLE_LOOP = [
        "/----\\",
        "|    |",
        "|    |",
        "\\----/"
    ]

    def test_parse_simple_loop(self):
        result = day13.parse_track(self.SIMPLE_LOOP)
        assert result['track'] == {
            (0, 0): '/', (5, 0): '\\', (0, 3): '\\', (5, 3): '/'
        }
