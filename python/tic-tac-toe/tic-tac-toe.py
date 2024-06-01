#!/usr/bin/env python3
#Brandon Swan

#raising errors on empty string
#https://stackoverflow.com/questions/19579997/how-to-catch-empty-user-input-using-a-try-and-except-in-python
#todo data validation
#print to txt doc
#fix prompt at end to replay
#add a function to display stats for all players
#add timing for easier reading
import sys
import os

def create_records(filename):
    if not os.path.exists(filename):
        try:
            with open(filename, 'w') as file:
                print("File created successfully")
        except IOError:
            print("Error: could not create file " + filename)
            return False
    else:
        #print("File already exists") This was used to test if the file exists, but user doesn't need to see it.
        return True

#ai helped generate this since I kept getting errors. added the wins, losses, draws, and append file
#to allow a new player to be added with update_stats()
def update_stats(filename, name, result, _wins = 0, _losses = 0, _draws = 0):
    #TypeError: cannot unpack non-iterable int object
    #Received error above if tried to declare result variables in function
    #read file
    data = read_file(filename)
    #see if the name exists in the data. if so, update stats
    if name in data:
        if result == 'win':
            data[name]['wins'] += 1
        elif result == 'loss':
            data[name]['losses'] += 1
        elif result == 'draw':
            data[name]['draws'] += 1
        else:
            print("Invalid result")
            return
        #return required, causes the following error if not 
        write_file(filename, data)
        #print("Stats updated successfully")
    else:
        #if they don't exist, add them with initial stats and result of game
        if result == 'win':
            _wins += 1
        elif result == 'loss':
            _losses += 1
        elif result == 'draw':
            _draws += 1
        else:
            print("Invalid result")
            return
        append_file(filename, name, _wins, _losses, _draws)

#ai generated, minus try/except
#https://stackoverflow.com/questions/21744804/how-to-read-comma-separated-values-from-a-text-file-then-output-result-to-a-tex
#how to split a readline by comma values
def read_file(filename):
    try:
        data = {}
        with open(filename, 'r') as f:
            for line in f:
                name, wins, losses, draws = line.strip().split(',')
                #breaks the reading up by commas, strips white space. maxsplit determines max number of splits, which was removed
                #makes a dictionary with player name as key, and the value is a dictionary with stats
                data[name] = {'wins': int(wins), 'losses': int(losses), 'draws': int(draws)}
        return data
    except IOError:
        print("Error: could not read file " + filename)

def read_file_pretty(filename):
    try:
        data = {}
        print("Name:\t\tWins:\t\tLosses:\t\tDraws:")
        with open(filename, 'r') as f:
            for line in f:
                name, wins, losses, draws = line.strip().split(',')
                print(name + "\t\t" + wins + "\t\t" + losses + "\t\t" + draws)
    except IOError:
        print("Error: could not read file " + filename)
        

#used if a player doesn't exist, or if the file doesn't exist
def append_file(filename, name, wins, losses, draws):
    try:
        with open(filename, 'a') as f:
            f.write(f"{name},{wins},{losses},{draws}\n")
        print("Record appended successfully.")
    except IOError:
        print("Error: could not append to record")


def write_file(filename, data):
    with open(filename, 'w') as file:
        for name, stats in data.items():
            file.write(f"{name},{stats['wins']},{stats['losses']},{stats['draws']}\n")

def validate_player(player_number):
    name = ""
    while True:
        try:
            print("What is the name of player " + str(player_number) + "?")
            name = input(">>> ")
            if not name:
                raise ValueError("Player name cannot be an empty string. Plase try again.")
            if name.isnumeric():
                raise TypeError("Player name cannot be a number. Please try again.")
            break #to break the try and while
        except ValueError as e:
            print(e)
        except TypeError as e:
            print(e)
    return name

    
def introduction():

    print("Welcome to Tic-Tac-Toe.")
    print("""
Here are some rules.
Get three in a row. Don't lose.
""")


#creates the board
def create_board():
    board = [[str(3*j + i + 1) for i in range(3)] for j in range(3)] 
    return board

#styles the board for display
def display_board(board):
    #top section
    print("+---+---+---+")
    for i in range(3):
        print("| " + board[i][0] + " | " + board[i][1] + " | " + board[i][2] + " |")
        print("+---+---+---+")
    return board

def play_turn(player, token, board):
    #sets to false to prevent user from choosing beyond what is asked
    valid_choice = False
    token_tuple = ('X','O')
    while not valid_choice:
        print(player + "'s turn.")
        choice = int(input("Choose a position from 1-9: "))
        while choice not in range(1,10):
            print("The number chosen is invalid. Please try again.")
            choice = int(input("Choose a number from 1-9: "))

        choice -= 1 #since the highest number is 2, prevents out of IndexError and improper placement of tokens with math below

        row = choice // 3 # row1 = 0, row2 = 1, row3 = 2
        col = choice % 3 #col1 = 0, col2 = 1, col3 = 3 

        if board[row][col] not in token_tuple:
            board[row][col] = token
            break
        else:
            print("That position has already been taken. Please choose another.")
            display_board(board)

        """ old code
        if choice <= 3:
            if board[0][choice-1] not in token_tuple:
                board[0][choice-1] = token
                break
            else:
                print("Choice not valid, please try again.")
                pass
        elif choice >=4 and choice <=6:
            if board[1][choice-4] not in token_tuple:
                board[1][choice-4] = token
                break
            else:
                print("Choice not valid, please try again.")
                pass
        else:
            if board[2][choice-7] not in token_tuple:
                board[2][choice-7] = token
                break
            else:
                print("Choice not valid, please try again.")
                pass
        """
    display_board(board)

def win_conditions(board, player, token):
    win_condition = False
    #check rows
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] == token:
            win_condition = True
            print(player + " is the winner.")
    #check columns
    for i in range(3):
        if board[0][i] == board[1][i] == board[2][i] == token:
            print("testing")
            win_condition = True
            print(player + " is the winner.")

    #diag check
    if board[0][0] == board[1][1] == board[2][2] == token:
        win_condition = True
        print(player + " is the winner.")

    if board[0][2] == board[1][1] == board[2][0] == token:
        win_condition = True
        print(player + " is the winner.")

    #return
    return win_condition

def main():

    
    #variables
    file = 'stats.txt'
    count = 0
    player_1, player_2 = "", ""
    token_chosen, winner_found, play_again = False, False, False
    board = create_board()
    introduction()

    create_records(file)
    print("")

    while True:
        try:
            print("Would you like to view player stats?")
            print("Input 1 for Yes  |  2 for No")
            user_input = int(input(">>> "))
            if user_input not in [1, 2]:
                raise ValueError("Input entered not 1 or 2. Please try again.")
            if user_input == 1:
                read_file_pretty(file)
                break
            else:
                break
        except ValueError as e:
            print(e)
        except TypeError as e:
            print("Text input not valid, please try again.")
    print()
    print("Let's start the game.")
    print()
    player_1 = validate_player(1)
    player_2 = validate_player(2)
    
    
    while not token_chosen:
        try:
            print(player_1 + " would you like to be 1.) X or 2.) 0?")
            user_input = int(input(">>> "))
            if user_input not in [1, 2]:
                raise ValueError("Input entered not 1 or 2. Please try again.")
            if user_input == 1:
                player_1_token = "X"
            else:
                player_1_token = "O"
            token_chosen = True
        except ValueError as e:
            print(e)
        except TypeError as e:
            print("Text input not valid, please try again.")

            
    display_board(board)

    if player_1_token == "X":
        player = player_1
        token = player_1_token
        player_2_token = "O"
    else:
        player = player_2
        player_2_token = "X"
        token = player_2_token 
    print()
    print(player_1 + " is " + player_1_token + " and " + player_2 + " is " + player_2_token)
    print()

    while True:
        count += 1

        #must come before turn is called or stuck in loop
        if count == 10:
            print("The game ended in a draw.")
            update_stats(file, player_1, 'draw')
            update_stats(file, player_2, 'draw')
            break
        
        print("Turn " + str(count))
        play_turn(player, token, board)

        #print(play_turn(player, token, board))

        winner_found = win_conditions(board, player, token)
        #print(winner_found)
        
        if winner_found == True:
            if player == player_1:
                update_stats(file, player_1, 'win')
                update_stats(file, player_2, 'loss')
            else:
                update_stats(file, player_1, 'loss')
                update_stats(file, player_2, 'win')
            break

        if player == player_1:
            player = player_2
            token = player_2_token
        else:       
            player = player_1
            token = player_1_token
                


    
    print("Would you like to play again?\n\n1.) Yes, \n2.) No")
    valid_option = False
    while not valid_option:
        try:
            user_input = int(input(">>> "))
            if user_input == 1:
                main()
            else:
                print("Thanks for playing!")
                sys.exit()
        except ValueError as e:
            print("Invalid option, please try again.")
            


if __name__ == "__main__":
    main()
