def find_best_attack(matrix, power):
    def in_range(x, y):
        return 0 <= x < len(matrix) and 0 <= y < len(matrix[0])

    def simulate_attack(x, y, dx, dy):
        count = 0
        for step in range(1, power+1):
            new_x, new_y = x + step * dx, y + step * dy
            if not in_range(new_x, new_y):
                break
            if matrix[new_x][new_y] == -1:  # Friendly troop
                return -1
            count += matrix[new_x][new_y]
        return count

    max_reward = 0
    best_position = (-1, -1)
    best_direction = ""
    directions = {'↑': (-1, 0), '→': (0, 1), '↓': (1, 0), '←': (0, -1)}
    direction_symbols = ['↑', '→', '↓', '←']

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            for symbol in direction_symbols:
                dx, dy = directions[symbol]
                reward = simulate_attack(i, j, dx, dy)
                if reward > max_reward:
                    max_reward = reward
                    best_position = (i, j)
                    best_direction = symbol

    if max_reward == 0:
        return "Do not use weapon at any place!"
    else:
        x, y = best_position
        return f"You can use weapon at row {x+1}, column {y+1}.\nThe direction is {best_direction}.\nYour reward is {max_reward}."

# Sample input matrix (grid) and weapon power
# -1 indicates friendly troops, positive values indicate enemies
sample_matrix = [
    [0, 0, 0, 0, 2],
    [0, -1, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, -1, 0],
    [0, 0, 2, 0, 0]
]
power = 3

# Find the best attack position and direction
find_best_attack(sample_matrix, power)
