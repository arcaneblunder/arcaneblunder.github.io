import pygame
from circleshape import CircleShape
from constants import LINE_WIDTH, ASTEROID_MIN_RADIUS
from logger import *
import random

class Asteroid(CircleShape):
    def __init__(self, x: float, y: float, radius: float) -> None:
        super().__init__(x, y, radius)

    def draw(self, screen: pygame.Surface) -> None:
        pygame.draw.circle(
            screen,
            "white",
            (self.position.x, self.position.y),
            self.radius,
            LINE_WIDTH
        )

    def update(self, dt: float) -> None:
        self.position += self.velocity * dt

    def split(self) -> None:
        # Remove the original asteroid
        self.kill()

        # If too small, do not split further
        if self.radius <= ASTEROID_MIN_RADIUS:
            return

        log_event("asteroid_split")

        # Random angle between 20 and 50 degrees
        angle = random.uniform(20, 50)

        # Create two new velocity vectors
        vel1 = self.velocity.rotate(angle)
        vel2 = self.velocity.rotate(-angle)

        # New radius
        new_radius = self.radius - ASTEROID_MIN_RADIUS

        # Create two new asteroids
        from asteroid import Asteroid  # avoid circular import issues
        a1 = Asteroid(self.position.x, self.position.y, new_radius)
        a2 = Asteroid(self.position.x, self.position.y, new_radius)

        # Make them move faster
        a1.velocity = vel1 * 1.2
        a2.velocity = vel2 * 1.2
