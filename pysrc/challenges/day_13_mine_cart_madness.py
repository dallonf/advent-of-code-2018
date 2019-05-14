import typing


class Cart(typing.NamedTuple):
    id: int
    position: typing.Tuple[int, int]
    "^, V, <, >"
    direction: str


def parse_track(input_lines):
    track = {}
    carts = {}

    for y, line in enumerate(input_lines):
        for x, char in enumerate(line):
            if char in ("/", "\\", "+"):
                track[(x, y)] = char
            if char in ('^', 'V', '<', '>'):
                new_cart = Cart(id=len(carts), position=(x, y), direction=char)
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
            'V': down,
            '>': right
        }

        new_position = directions[cart.direction]()

        next_tick_carts[cart.id] = cart._replace(position=new_position)

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
