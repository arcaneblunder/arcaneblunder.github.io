import pygame

from asteroidfield import AsteroidField
from constants import *
from logger import log_state, log_event
from player import Player
from asteroid import Asteroid
from shot import Shot
import sys


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()
    dt = 0.0

    updatable = pygame.sprite.Group()
    drawable = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    shots = pygame.sprite.Group()

    AsteroidField.containers = (updatable)
    Asteroid.containers = (asteroids, updatable, drawable)
    Player.containers = (updatable, drawable)
    Shot.containers = (shots, updatable, drawable)
    asteroidfield = AsteroidField()
    player = Player(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)




    while True:
        log_state()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return

        dt = clock.tick(60) / 1000

        screen.fill("black")
        updatable.update(dt)
        for sprite in drawable:
            sprite.draw(screen)
        for asteroid in asteroids:
            for shot in shots:
                if shot.collides_with(asteroid):
                    log_event("asteroid_shot")
                    shot.kill()
                    asteroid.split()


            if player.collides_with(asteroid):
                log_event("player_hit")
                print("Game over!")
                sys.exit()
        pygame.display.flip()


if __name__ == "__main__":
    main()
