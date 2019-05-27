import math
import numpy
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
    size = (GRID_SIZE - 1) - selection_size
    return numpy.zeros((size, size))


class SummedAreaTable:
    """https://en.wikipedia.org/wiki/Summed-area_table"""

    table: numpy.ndarray

    def __init__(self, serial_number: int):
        if (serial_number in summed_area_table_cache):
            self.table = summed_area_table_cache[serial_number]
        else:
            self.table = numpy.zeros((GRID_SIZE, GRID_SIZE))

            def compute_cell(x: int, y: int) -> int:
                return get_power_level(x, y, serial_number) \
                    + self.read_from_table(x, y - 1) \
                    + self.read_from_table(x - 1, y) \
                    - self.read_from_table(x - 1, y - 1)

            for ring in range(GRID_SIZE):
                for edge in range(ring):
                    # compute the edges from top to bottom and left to right
                    self.table[edge, ring] = compute_cell(edge + 1, ring + 1)
                    self.table[ring, edge] = compute_cell(ring + 1, edge + 1)
                # finally compute the corner of the ring
                self.table[ring, ring] = compute_cell(ring + 1, ring + 1)

            summed_area_table_cache[serial_number] = self.table

    def read_from_table(self, x: int, y: int) -> int:
        if x <= 0 or y <= 0:
            return 0
        return self.table[x - 1, y - 1]

    def get_sum(self, x1: int, y1: int, x2: int, y2: int) -> int:
        return \
            self.read_from_table(x2, y2) \
            + self.read_from_table(x1 - 1, y1 - 1) \
            - self.read_from_table(x2, y1 - 1) \
            - self.read_from_table(x1 - 1, y2)


def get_best_square(serial_number: int, selection_size=3):
    table = SummedAreaTable(serial_number)

    def power(x, y):
        total_power = table.get_sum(
            x,
            y,
            x + selection_size - 1,
            y + selection_size - 1
        )

        return total_power

    grid = make_grid(selection_size)
    flat_grid = grid.flat
    for i in range(len(flat_grid)):
        (x, y) = numpy.unravel_index(i, grid.shape)
        flat_grid[i] = power(x + 1, y + 1)

    (maxX, maxY) = numpy.unravel_index(numpy.argmax(grid), grid.shape)
    return {
        'x': maxX + 1,
        'y': maxY + 1,
        'total_power': grid[maxX, maxY]
    }


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
