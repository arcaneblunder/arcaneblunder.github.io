#!/usr/bin/env python3
#Brandon Swan

#import time to do the simulation of typing text
import time, sys


armor_destroyed = False

#init variables
inventory = []
win_condition = False

moves = 20


#function to type out text
def paced_text(text):
    for letter in text:
        sys.stdout.write(letter)
        time.sleep(.008)

#Create breaks between text
def para_break():
    print("\n")

#Player death for text and ask to play again
def player_death(text):
    print(f"{text}. You are dead. Game Over.")
    print("Would you like to play again? Y or N")
    player_input = input("").lower()
    if player_input == "n":
        sys.exit("The program has ended.")
    else:
        pass

#Rooms start here
def entry_way():
    #left to collapsed tunnel, center to antechamber, right to small closet
    actions = ["Take the left path.", "Take the center path.", "Take the right path."]
    
    paced_text("The entry way is where you fell. You know that you don't have much time left. There are three ways out of this dark, dank room.")
    para_break()
    #https://stackoverflow.com/questions/26949090/python-go-through-list-without-last-element
    #Allows me to slice off the last bit if needed
    #for index, option in enumerate(entry_way[:-1]):
    for index, option in enumerate(actions):
        print(index + 1, option)

    user_input = input("Which path do you take? ")
    para_break()
    
    if user_input == '1':
        collapsed_tunnel()
    elif user_input == '2':
        ante_chamber()
    elif user_input == '3':
        small_closet()
    else:
        user_input = input("Invalid selection, please try again. ")
        para_break()

def collapsed_tunnel():
    actions = ["Go back."]

    paced_text("This tunnel seems to have collapsed with no way forward. It looks like your only option is to go back.")
    para_break()
    for index, option in enumerate(actions):
        print(index + 1, option)

    para_break()
    user_input = input("What do you do? ")
    para_break()
    if user_input == "1":
        entry_way()
    else:
        user_input = input("Invalid selection, please try again. ")

def small_closet():
    if "Key" in inventory:
        actions = ["Go back.", "Drink vial."]
    else:
        actions = ["Go back.", "Pick up key", "Drink vial."]
    #Items to pick up: key
    paced_text("This small room seems to be a closet. There is an exit the way you came, a key sitting on a nearby table, and an unlabeled vial begging to be quaffed.")
    para_break()
    for index, option in enumerate(actions):
        print(index + 1, option)
    para_break()
    user_input = input("What do you do? ")
    para_break()
    if len(actions) == 3:
        if user_input == "1":
            entry_way()
        elif user_input == "2":
            paced_text("You have picked up the key. ")
            inventory.append("Key")
            small_closet()
        elif user_input == "3":
            paced_text("You pick up the vial, but are overcome with a strange desire to drink the contents.\
Your mind screams as your body doesn't listen. The liquid pours down your throat and your body feels like it's on fire.\
You can see your shadow dance along the walls as the flames engulf your body.")
            player_death("You watch as the light fades and glows brighter.")
        else:
            user_input = input("Invalid selection, please try again. ")       
    else:
        if user_input == "1":
            entry_way()
        elif user_input == "2":
            paced_text("You pick up the vial, but are overcome with a strange desire to drink the contents.\
Your mind screams as your body doesn't listen. The liquid pours down your throat and your body feels like it's on fire.\
You can see your shadow dance along the walls as the flames engulf your body.")
            player_death("You watch as the light fades and glows brighter. The key you picked up glistens in the light.")
        else:
            user_input = input("Invalid selection, please try again. ")              


def ante_chamber():
    if "Key" in inventory:
        actions = ["Return to the Entryway.", "Unlock door.", "Examine the shadows."]
    else:
        actions = ["Return to the Entryway.", "Examine door.", "Examine the shadows."]
    paced_text("The antechamber is extremely dark. The shadows seem to shift and dance just on the outside of your vision.")
    para_break()
    
    for index, option in enumerate(actions):
        print(index + 1, option)
    para_break()
    user_input = input("What do you do? ")
    para_break()

    if "Key" in inventory:
        if user_input == '1':
            entry_way()
        elif user_input == '2':
            print("You unlock the door and pass through. As you proceed the path behind you collapses.")
            para_break()
            shadowy_corridor()
        elif user_input == '3':
            print("The shadows seem to swirl with the light, causing you to become dizzy. You take a step back to regain your composure.")
            para_break()
            ante_chamber()
        else:
            user_input = input("Invalid selection, please try again. ")
            para_break()
    else:
        if user_input == '1':
            entry_way()
        elif user_input == '2':
            print("The door is locked and won't budge no matter how hard you strike it.")
            para_break()
            ante_chamber()
        elif user_input == '3':
            print("The shadows seem to swirl with the light, causing you to become dizzy. You take a step back to regain your composure.")
            para_break()
            ante_chamber()
        else:
            user_input = input("Invalid selection, please try again. ")
            para_break()

def shadowy_corridor():

    
    if "Mace" in inventory and "Sword" in inventory:
        paced_text("The shadows of this room seem to point your eyes toward the single source of light in the next room.")
        actions = ["Go forward into the next room."]
    elif "Sword" in inventory:
        paced_text("The shadows of this room seem to point your eyes toward the single source of light in the next room. On the floor notice a mace.")
        actions = ["Pick up mace.", "Go forward into the next room."]
    elif "Mace" in inventory:
        paced_text("The shadows of this room seem to point your eyes toward the single source of light in the next room. On the floor notice a sword.")
        actions = ["Pick up sword.", "Go forward into the next room."]
    else:
        paced_text("The shadows of this room seem to point your eyes toward the single source of light in the next room. On the floor notice a sword and mace.")
        actions = ["Pick up sword.", "Pick up mace.", "Go forward into the next room."]

    
    para_break()
    
    for index, option in enumerate(actions):
        print(index + 1, option)
    para_break()
    user_input = input("What do you do? ")
    para_break()
    if "Sword" in inventory or "Mace" in inventory:
        if "Sword" in inventory and "Mace" in inventory:
            if user_input == "1":
                broken_stairs()
        elif "Sword" in inventory:
            if user_input == "1":
                print("You pick up the mace.")
                para_break()
                inventory.append("Mace")
                shadowy_corridor()
            elif user_input == "2":
                broken_stairs()
            else:
                user_input = input("Invalid selection, please try again. ")
                para_break()
        else:
            if user_input == "1":
                print("You pick up the sword.")
                para_break()
                inventory.append("Sword")
                shadowy_corridor()
            elif user_input == "2":
                broken_stairs()
            else:
                user_input = input("Invalid selection, please try again. ")
                para_break()
    else:
        if user_input == "1":
            print("You pick up the sword.")
            para_break()
            inventory.append("Sword")
            shadowy_corridor()
        elif user_input == "2":
            print("You pick up the mace.")
            para_break()
            inventory.append("Mace")
            para_break()
            shadowy_corridor()
        elif user_input == "3":
            broken_stairs()
        else:
            user_input = input("Invalid selection, please try again. ")
            para_break()
    para_break()

    
def broken_stairs():
    paced_text("The light shines in this room emanating from a strange hovering sphere in the middle floating above the ground. The stairs \
have seen better days and are heavy with damage.")
    para_break()
    actions = ["Descent the stairs.", "Climb the stairs.", "Touch the light.", "Go back to the corridor."]

    para_break()
    
    for index, option in enumerate(actions):
        print(index + 1, option)
    para_break()
    user_input = input("What do you do? ")
    para_break()
    if user_input == "1":
        ruined_armory()
    elif user_input == "2":
        final_gate()
    elif user_input == "3":
        paced_text("You step toward the light. You're inches from touching its radiance when the stonework beneath your feet gives way.")
        player_death("Your final moments are you falling into the darkness, the light speeding away from your vision before\
you hit the ground.")
        para_break()
    elif user_input == "4":
        shadowy_corridor()
        para_break()
    else:
        user_input = input("Invalid selection, please try again. ")
        para_break()


def ruined_armory():
    global armor_destroyed
    
    if armor_destroyed != True:

        
        paced_text("This room looks to be a ruined armory. Only a single suit of armor remains.")
        actions = ["Go back.", "Examine the suit of armor."]
     
        para_break()
        
        for index, option in enumerate(actions):
            print(index + 1, option)
        para_break()
        user_input = input("What do you do? ")
        para_break()
        
        if user_input == "1":
            broken_stairs()
        elif user_input == "2":
            print("The armor springs to life and attacks you!")
            if "Mace" in inventory or "Sword" in inventory:
                if "Mace" in inventory and "Sword" in inventory:
                    actions_2 = ["Hit the armor with your mace.", "Runaway", "Hit the armor with your sword."]
                    
                elif "Sword" in inventory:
                    actions_2 = ["Hit the armor with your sword.", "Runaway"]
                elif "Mace" in inventory:
                    actions_2 = ["Hit the armor with your mace.", "Runaway"]


                para_break()
                for index, option in enumerate(actions_2):
                    print(index + 1, option)
                para_break()
                user_input = input("What do you do? ")
                para_break()
                if "Mace" in inventory or "Sword" in inventory:
                    if "Mace" in inventory and "Sword" in inventory:
                        if user_input == "1":
                            print("You strike the armor with your mace. The magical armor dents and falls apart leaving an amulet.")
                            para_break()
                            armor_destroyed = True
                            ruined_armory()
                        elif user_input == "2":
                            print("You swing your sword at the armor and it has no effect!")
                            para_break()
                            player_death("The magical suit of armor grabs a hold of you and disassembles, reassembling over your body. You are trapped for all eternity.")
                            para_break()
                        elif user_input == "3":
                            player_death("The magical suit of armor grabs a hold of you and disassembles, reassembling over your body. You are trapped for all eternity.")
                            para_break()
                        else:
                            user_input = input("Invalid selection, please try again. ")
                            para_break()

                    elif "Mace" in inventory:
                        if user_input == "1":
                            print("You strike the armor with your mace. The magical armor dents and falls apart leaving an amulet.")
                            para_break()
                            armor_destroyed = True
                            ruined_armory()
                        elif user_input == "2":
                            player_death("The magical suit of armor grabs a hold of you and disassembles, reassembling over your body. You are trapped for all eternity.")
                            para_break()
                        else:
                            user_input = input("Invalid selection, please try again. ")
                            para_break()
                    else:
                        if user_input == "1":
                            player_death("The magical suit of armor grabs a hold of you and disassembles, reassembling over your body. You are trapped for all eternity.")
                            para_break()
                        else:
                            user_input = input("Invalid selection, please try again. ")
                            para_break()
            
            else:
                player_death("Armor death")
                para_break()
                
        else:
            user_input = input("Invalid selection, please try again. ")
            para_break()
    else:

        if "Amulet" not in inventory:
            paced_text("This room looks to be a ruined armory. An amulet lies next to a set of ruined armor.")
            actions = ["Go back.", "Take the amulet."]
            para_break()
            for index, option in enumerate(actions):
                print(index + 1, option)
            para_break()
            user_input = input("What do you do? ")
            para_break()
            if user_input == "1":
                broken_stairs()
            elif user_input == "2":
                print("You take the amulet.")
                para_break()
                inventory.append("Amulet")
                ruined_armory()
            else:
                user_input = input("Invalid selection, please try again. ")
                para_break()
        else:
            actions = ["Go back."]
            for index, option in enumerate(actions):
                print(index + 1, option)

            user_input = input("What do you do? ")
            para_break()
            if user_input == "1":
                broken_stairs()
            else:
                user_input = input("Invalid selection, please try again. ")
                para_break()
        
def final_gate():
    paced_text("You see a glimmering forcefield and the way to your freedom.")
    
    actions = ["Go back.", "Run to the forcefield."]

    para_break()
    
    for index, option in enumerate(actions):
        print(index + 1, option)
    para_break()
    user_input = input("What do you do? ")
    para_break()
    if user_input == "1":
        broken_stairs()
    elif user_input == "2":
        if "Amulet" in inventory:
            print("The amulet around your neck glows brightly. The forcefield in front of you shatters. You're free!")
            para_break()
            #win_condition = True
            sys.exit("You have won. Congratulations.")
        else:
            player_death("You feel warmer as you get closer to the forcefield. Before you realize it, you lose consciousness.")
            para_break()
    else:
        user_input = input("Invalid selection, please try again. ")
        para_break()
    

    
#Start Game
while win_condition != True:
    

    paced_text("You have fallen into a cavern deep beneath the castle. \n\
Armed with a torch, you need to navigate the catacombs before \n\
your torch goes out and darkness descends upon you.")
    para_break()
    entry_way()


