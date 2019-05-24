import typing


class Cart(typing.NamedTuple):
    id: int
    position: typing.Tuple[int, int]
    "^, v, <, >"
    direction: str
    intersections_visited: int


def turn_intersection(direction, turn_instruction):
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


def turn_corner(direction, corner):
    turns = {
        '\\': {
            '^': '<',
            'v': '>',
            '<': '^',
            '>': 'v',
        },
        '/': {
            '^': '>',
            'v': '<',
            '<': 'v',
            '>': '^',
        }
    }
    return turns[corner][direction]


def get_turn_instruction(intersections_visited):
    instructions = {
        0: 'left',
        1: 'straight',
        2: 'right',
    }
    index = intersections_visited % len(instructions)
    return instructions[index]


def print_state(state):
    positions = list(state['track'].keys()) + \
        [cart.position for cart in state['carts'].values()]
    max_x = max((x for x, _ in positions), default=0)
    max_y = max((y for _, y in positions), default=0)

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
    first_collision = None

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

        track_piece = state['track'].get(new_position, '')

        # handle corners
        if track_piece in ('\\', '/'):
            new_direction = turn_corner(cart.direction, track_piece)

        # handle intersections
        if track_piece == '+':
            new_direction = turn_intersection(cart.direction, get_turn_instruction(
                cart.intersections_visited))
            new_intersections_visited += 1

        next_tick_carts[cart.id] = cart._replace(
            position=new_position, direction=new_direction, intersections_visited=new_intersections_visited)

        colliding_carts = [other_cart for other_cart in next_tick_carts.values()
                           if other_cart.id != cart.id and other_cart.position == new_position]

        if len(colliding_carts):
            first_collision = colliding_carts[0].position
            # remove colliding carts from the simulation
            del next_tick_carts[cart.id]
            for other_cart in colliding_carts:
                if other_cart.id in next_tick_carts:
                    del next_tick_carts[other_cart.id]

    new_state = state.copy()
    new_state['carts'] = next_tick_carts

    return {
        'first_collision': first_collision,
        'state': new_state
    }


def simulate_until_collision(state, max_ticks=1000):
    for _ in range(max_ticks):
        result = simulate_tick(state)
        state = result['state']

        if result['first_collision']:
            return result

    return result


def simulate_removing_carts(state, max_ticks=1000):
    for _ in range(max_ticks):
        result = simulate_tick(state)
        state = result['state']

        if len(state['carts']) == 1:
            # if there's only one cart left, return the result and its position
            result['last_cart_position'] = next(
                iter(state['carts'].values())).position
            return result

    return result
