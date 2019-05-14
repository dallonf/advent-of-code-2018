def parse_track(input_lines):
    track = {}
    carts = []

    for y, line in enumerate(input_lines):
        for x, char in enumerate(line):
            if char in ("/", "\\"):
                track[(x, y)] = char

    return {
        'track': track,
        'carts': carts
    }
