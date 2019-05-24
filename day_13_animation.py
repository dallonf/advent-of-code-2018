from os import system, name
import time
import pysrc.challenges.day_13_mine_cart_madness as day13
import pysrc.challenges.day_13_mine_cart_madness_test as day13test


def clear():

    # for windows
    if name == 'nt':
        _ = system('cls')

    # for mac and linux(here, os.name is 'posix')
    else:
        _ = system('clear')


state = day13.parse_track(day13test.PUZZLE_INPUT)

while True:
    result = day13.simulate_tick(state)
    state = result['state']
    clear()
    # print(len(state['carts']))
    day13.print_state(state)
    time.sleep(0.1)
