import math
from typing import List

GRID_SIZE = 300


power_level_cache = dict()


def get_power_level(x: int, y: int, serial_number: int) -> int:
    if x > GRID_SIZE or y > GRID_SIZE:
        raise Exception(f'Invalid coordinates: {x}, {y}')
    key = (x, y, serial_number)
    if key in power_level_cache:
        return power_level_cache[key]

    rack_id = x + 10
    result = rack_id * y
    result += serial_number
    result *= rack_id
    hundreds_place = math.floor(result / 100) - math.floor(result / 1000) * 10
    result = hundreds_place - 5
    power_level_cache[key] = result
    return result


summed_area_table_cache = dict()


def make_grid(selection_size: int):
    return [
        {'x': x, 'y': y}
        for y in range(1, GRID_SIZE + 1 - (selection_size - 1))
        for x in range(1, GRID_SIZE + 1 - (selection_size - 1))
    ]


class SummedAreaTable:
    """https://en.wikipedia.org/wiki/Summed-area_table"""

    table: List[List[int]]

    def __init__(self, serial_number: int):
        if (serial_number in summed_area_table_cache):
            self.table = summed_area_table_cache[serial_number]
        else:
            self.table = [
                [None for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]

            def populate_table(x: int, y: int) -> int:
                if x <= 0 or y <= 0:
                    return 0
                result = self.table[x - 1] and self.table[x - 1][y - 1]
                if result != None:
                    return result
                else:
                    # compute result lazily
                    computed = get_power_level(x, y, serial_number) \
                        + populate_table(x, y - 1) \
                        + populate_table(x - 1, y) \
                        - populate_table(x - 1, y - 1)
                    self.table[x - 1][y - 1] = computed
                    return computed

            populate_table(GRID_SIZE, GRID_SIZE)
            summed_area_table_cache[serial_number] = self.table

    def read_from_table(self, x: int, y: int) -> int:
        if x <= 0 or y <= 0:
            return 0
        return self.table[x - 1][y - 1]

    def get_sum(self, x1: int, y1: int, x2: int, y2: int) -> int:
        return \
            self.read_from_table(x2, y2) \
            + self.read_from_table(x1 - 1, y1 - 1) \
            - self.read_from_table(x2, y1 - 1) \
            - self.read_from_table(x1 - 1, y2)


def get_best_square(serial_number: int, selection_size=3):
    table = SummedAreaTable(serial_number)

    def square_with_power(cell):
        total_power = table.get_sum(
            cell['x'],
            cell['y'],
            cell['x'] + selection_size - 1,
            cell['y'] + selection_size - 1
        )

        return {**cell, 'total_power': total_power}

    result = max(
        [square_with_power(cell) for cell in make_grid(selection_size)],
        key=lambda a: a['total_power']
    )

    return result


def get_best_square_and_size(serial_number: int):
    table = SummedAreaTable(serial_number)

    def candidate(cell):
        total_power = get_power_level(cell['x'], cell['y'], serial_number)

        best_size = 1
        best_power = total_power

        max_size = GRID_SIZE + 1 - max(cell['x'], cell['y'])

        for new_size in range(2, max_size):
            new_edge_delta = new_size - 1
            total_power = table.get_sum(
                cell['x'], cell['y'],
                cell['x'] + new_edge_delta,
                cell['y'] + new_edge_delta
            )

            if total_power > best_power:
                best_power = total_power
                best_size = new_size

        return {**cell, 'size': best_size, 'total_power': best_power}

    result = max(
        [candidate(cell) for cell in make_grid(1)],
        key=lambda a: a['total_power']
    )

    return result
