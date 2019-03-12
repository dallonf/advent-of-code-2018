
import pytest
from .day_11_chronal_charge import get_power_level, SummedAreaTable, get_best_square

PUZZLE_INPUT = 5719


class TestPartOne:
    def test_gets_power_level(self):
        assert get_power_level(3, 5, 8) == 4

    def test_power_level_more_examples(self):
        assert get_power_level(122, 79, 57) == -5
        assert get_power_level(217, 196, 39) == 0
        assert get_power_level(101, 153, 71) == 4

    class TestSummedAreaTable:
        def test_read_from_table_very_small_numbers(self):
            table = SummedAreaTable(18)
            assert table.read_from_table(1, 1) == get_power_level(1, 1, 18)
            assert table.read_from_table(2, 1) == get_power_level(
                1, 1, 18) + get_power_level(2, 1, 18)
            assert table.read_from_table(1, 2) == get_power_level(
                1, 1, 18) + get_power_level(1, 2, 18)
            assert table.read_from_table(2, 2) == \
                get_power_level(1, 1, 18) \
                + get_power_level(1, 2, 18) \
                + get_power_level(2, 1, 18) \
                + get_power_level(2, 2, 18)

        def test_get_sum_very_small_numbers(self):
            table = SummedAreaTable(18)
            assert table.get_sum(1, 1, 2, 2) == get_power_level(1, 1, 18) \
                + get_power_level(1, 2, 18) \
                + get_power_level(2, 1, 18) \
                + get_power_level(2, 2, 18)

        def test_get_exact_square(self):
            table = SummedAreaTable(18)
            assert table.get_sum(33, 45, 33, 45) == 4

        def test_get_sum(self):
            table = SummedAreaTable(18)
            assert table.get_sum(33, 45, 35, 47) == 29

    def test_best_square_1(self):
        result = get_best_square(18)
        assert result == {'x': 33, 'y': 45, 'total_power': 29}

    def test_best_square_2(self):
        result = get_best_square(42)
        assert result == {'x': 21, 'y': 61, 'total_power': 30}

    def test_answer(self):
        result = get_best_square(PUZZLE_INPUT)
        assert result == {'total_power': 29, 'x': 21, 'y': 34}
