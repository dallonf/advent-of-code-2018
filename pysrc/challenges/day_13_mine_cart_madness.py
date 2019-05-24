import typing


class Cart(typing.NamedTuple):
    id: int
    position: typing.Tuple[int, int]
    "^, v, <, >"
    direction: str
    intersections_visited: int


def turn(direction, turn_instruction):
    turns = {
        '^': {
            'left': '<',
            'straight': '^',
            'right': '>',
        },
        'v': {
            'left': '>',
            'straight': 'v',
            'right': '<',
        },
        '<': {
            'left': 'v',
            'straight': '<',
            'right': '^',
        },
        '>': {
            'left': '^',
            'straight': '>',
            'right': 'v',
        },
    }
    return turns[direction][turn_instruction]


def get_turn_instruction(intersections_visited):
    instructions = {
        0: 'left',
        1: 'straight',
        2: 'right',
    }
    index = intersections_visited % len(instructions)
    return instructions[index]


def print_state(state):
    max_x = max(*(x for x, _ in state['track'].keys()))
    max_y = max(*(y for _, y in state['track'].keys()))

    def character(x, y):
            "Print the cart if there is one at this location, otherwise print the track piece"
            cart = next(
                (cart for cart in state['carts'].values() if cart.position == (x, y)), None)
            if cart:
                return cart.direction
            else:
                return state['track'].get((x, y), ' ')

    for y in range(max_y + 1):
        line = (character(x, y) for x in range(max_x + 1))
        print(''.join(line))


def parse_track(input_lines):
    track = {}
    carts = {}

    for y, line in enumerate(input_lines):
        for x, char in enumerate(line):
            if char in ("/", "\\", "+"):
                track[(x, y)] = char
            if char in ('^', 'v', '<', '>'):
                new_cart = Cart(id=len(carts), position=(x, y),
                                direction=char, intersections_visited=0)
                carts[new_cart.id] = new_cart

    return {
        'track': track,
        'carts': carts
    }


def simulate_tick(state):
    carts_to_simulate = list(state['carts'].values())
    carts_to_simulate.sort(key=lambda x: x.position)
    next_tick_carts = state['carts'].copy()
    collision = None

    for cart in carts_to_simulate:
        x, y = cart.position

        def up():
            return (x, y - 1)

        def left():
            return (x - 1, y)

        def down():
            return (x, y + 1)

        def right():
            return (x + 1, y)

        directions = {
            '^': up,
            '<': left,
            'v': down,
            '>': right
        }

        new_position = directions[cart.direction]()
        new_direction = cart.direction
        new_intersections_visited = cart.intersections_visited

        # handle intersections
        if state['track'].get(cart.position, '') == '+':
            new_direction = turn(cart.direction, get_turn_instruction(
                cart.intersections_visited))
            new_intersections_visited += 1

        next_tick_carts[cart.id] = cart._replace(
            position=new_position, direction=new_direction, intersections_visited=new_intersections_visited)

        colliding_cart = next((other_cart for other_cart in next_tick_carts.values()
                               if other_cart.id != cart.id and other_cart.position == new_position), None)

        if colliding_cart:
            collision = colliding_cart.position

    new_state = state.copy()
    new_state['carts'] = next_tick_carts

    return {
        'collision': collision,
        'state': new_state
    }


def simulate_until_collision(state, max_ticks=1000):
    for _ in range(max_ticks):
        result = simulate_tick(state)
        state = result['state']

        if result['collision']:
            return result

    return result
