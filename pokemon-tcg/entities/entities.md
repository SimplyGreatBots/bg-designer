# Step-by-Step Reasoning

1. I read the Pokémon TCG rules and identified the following main entity categories: Game Objects (cards, zones), Actions (draw, play, attack, retreat, evolve, etc.), States (Special Conditions, Knocked Out, etc.), Roles (Player, Opponent), and Mechanics (Prize system, Turn structure).
2. For each entity, I considered its function, relationships, and importance:
   - Game Objects: Cards (Pokémon, Trainer, Energy), Deck, Hand, Bench, Discard Pile, Prize Cards, Active Spot, Zones.
   - Actions: Draw, Play, Evolve, Attach Energy, Attack, Retreat, Use Ability, Mulligan, etc.
   - States: Special Conditions (Asleep, Burned, Confused, Paralyzed, Poisoned), Knocked Out, In Play, etc.
   - Roles: Player, Opponent.
   - Mechanics: Prize Card System, Turn Structure, Sudden Death, etc.
3. I determined the best format for each entity (tables for card types, lists for actions, etc.), and cross-referenced related entities and rule sections.
4. I organized the entities into logical sections for clarity and navigation.

---

# Pokémon TCG Entities Reference

## Entity: Player

### Name
Player

### Type
Role

### Description
A participant in the game who controls a deck, hand, and Pokémon. Each game is played between two players.

### Attributes
- Deck (60 cards)
- Hand
- Bench
- Active Pokémon
- Prize Cards
- Discard Pile

### Relationships
- Opposes: [Opponent](#entity-opponent)
- Controls: [Pokémon Card](#entity-pokémon-card), [Trainer Card](#entity-trainer-card), [Energy Card](#entity-energy-card)
- Takes: [Turn](#entity-turn)

### References
- See: "Setting Up to Play", "Parts of a Turn"

---

## Entity: Opponent

### Name
Opponent

### Type
Role

### Description
The other player in the game, referenced in rules as the adversary.

### Attributes
- Same as [Player](#entity-player)

### Relationships
- Opposes: [Player](#entity-player)

### References
- See: "How to Win", "Prize Cards"

---

## Entity: Pokémon Card

### Name
Pokémon Card

### Type
Game Object

### Description
A card representing a Pokémon. Can be Basic, Stage 1, Stage 2, or special types (ex, V, VMAX, etc.). Used to battle, evolve, and perform attacks or abilities.

### Attributes
- Name
- Stage (Basic, Stage 1, Stage 2, etc.)
- HP
- Type
- Attacks
- Abilities
- Weakness/Resistance
- Retreat Cost
- Evolution Line

### Relationships
- Controlled by: [Player](#entity-player)
- Can be: [Active Pokémon](#entity-active-pokémon), [Benched Pokémon](#entity-benched-pokémon)
- Can be evolved by: [Evolution Card](#entity-evolution-card)
- Can be affected by: [Special Condition](#entity-special-condition), [Trainer Card](#entity-trainer-card), [Energy Card](#entity-energy-card)

### References
- See: "Parts of a Pokémon Card", "3 Card Types", "Evolution"

---

## Entity: Trainer Card

### Name
Trainer Card

### Type
Game Object

### Description
A card representing Items, Supporters, Stadiums, or Pokémon Tools. Used to affect gameplay, Pokémon, or the board state.

### Attributes
- Subtype (Item, Supporter, Stadium, Pokémon Tool)
- Effect
- Rule Text

### Relationships
- Controlled by: [Player](#entity-player)
- Can affect: [Pokémon Card](#entity-pokémon-card), [Game State](#entity-game-state)

### References
- See: "3 Card Types", "Play Trainer cards"

---

## Entity: Energy Card

### Name
Energy Card

### Type
Game Object

### Description
A card used to pay for attacks and abilities. Includes Basic and Special Energy types.

### Attributes
- Type (Grass, Fire, Water, etc.)
- Basic/Special

### Relationships
- Attached to: [Pokémon Card](#entity-pokémon-card)
- Controlled by: [Player](#entity-player)

### References
- See: "Energy Types", "Attach an Energy card"

---

## Entity: Deck

### Name
Deck

### Type
Zone

### Description
A stack of 60 cards from which a player draws. Contains Pokémon, Trainer, and Energy cards.

### Attributes
- 60 cards
- Face-down

### Relationships
- Belongs to: [Player](#entity-player)
- Source for: [Hand](#entity-hand), [Prize Cards](#entity-prize-cards)

### References
- See: "Deck Building", "Setting Up to Play"

---

## Entity: Hand

### Name
Hand

### Type
Zone

### Description
Cards drawn from the deck and held by the player. Hidden from the opponent.

### Attributes
- Variable size
- Hidden information

### Relationships
- Belongs to: [Player](#entity-player)
- Source for: [Card Play](#entity-action-card-play)

### References
- See: "Hand Management"

---

## Entity: Bench

### Name
Bench

### Type
Zone

### Description
A play area where up to 5 Pokémon can be placed, not currently active.

### Attributes
- Up to 5 Pokémon

### Relationships
- Belongs to: [Player](#entity-player)
- Holds: [Benched Pokémon](#entity-benched-pokémon)

### References
- See: "Zones of the Pokémon TCG"

---

## Entity: Active Pokémon

### Name
Active Pokémon

### Type
Game State

### Description
The Pokémon in the Active Spot, able to attack and be attacked.

### Attributes
- 1 per player

### Relationships
- Controlled by: [Player](#entity-player)
- Can be switched with: [Benched Pokémon](#entity-benched-pokémon) via [Retreat](#entity-action-retreat)

### References
- See: "Active Spot", "Retreat"

---

## Entity: Benched Pokémon

### Name
Benched Pokémon

### Type
Game State

### Description
Pokémon on the Bench, not currently active but can be switched in.

### Attributes
- Up to 5 per player

### Relationships
- Controlled by: [Player](#entity-player)
- Can become: [Active Pokémon](#entity-active-pokémon)

### References
- See: "Bench"

---

## Entity: Discard Pile

### Name
Discard Pile

### Type
Zone

### Description
A pile for cards that have been used, Knocked Out, or discarded.

### Attributes
- Face-up
- Unlimited size

### Relationships
- Belongs to: [Player](#entity-player)
- Receives: [Knocked Out Pokémon](#entity-state-knocked-out), [Used Trainer Cards](#entity-trainer-card)

### References
- See: "Discard Pile"

---

## Entity: Prize Cards

### Name
Prize Cards

### Type
Zone

### Description
Six cards set aside at the start of the game. Players take one when they Knock Out an opponent's Pokémon.

### Attributes
- 6 per player (standard)
- Face-down

### Relationships
- Belongs to: [Player](#entity-player)
- Win Condition: Take all Prize Cards

### References
- See: "Prize Card System", "How to Win"

---

## Entity: Special Condition

### Name
Special Condition

### Type
State

### Description
Status effects that alter a Pokémon's behavior: Asleep, Burned, Confused, Paralyzed, Poisoned.

### Attributes
- Type (Asleep, Burned, Confused, Paralyzed, Poisoned)
- Effect on Pokémon

### Relationships
- Affects: [Pokémon Card](#entity-pokémon-card)
- Removed by: [Evolve](#entity-action-evolve), [Move to Bench](#entity-action-move-to-bench)

### References
- See: "Special Conditions"

---

## Entity: Knocked Out

### Name
Knocked Out

### Type
State

### Description
A state where a Pokémon has damage equal to or greater than its HP. It is sent to the discard pile and the opponent takes a Prize card.

### Attributes
- Trigger: Damage >= HP

### Relationships
- Applies to: [Pokémon Card](#entity-pokémon-card)
- Sends to: [Discard Pile](#entity-discard-pile)
- Triggers: [Prize Card](#entity-prize-cards) gain

### References
- See: "Knock Out/Elimination"

---

## Entity: Turn

### Name
Turn

### Type
Game Structure

### Description
A sequence of actions taken by a player, including drawing, playing cards, attacking, etc.

### Attributes
- Draw Phase
- Action Phase
- Attack Phase

### Relationships
- Taken by: [Player](#entity-player)
- Contains: [Actions](#entity-action)

### References
- See: "Parts of a Turn"

---

## Entity: Action

### Name
Action

### Type
Action

### Description
A move a player can make during their turn. Includes drawing, playing, evolving, attaching, retreating, attacking, using abilities, etc.

### Subtypes
- Draw
- Play Pokémon
- Evolve
- Attach Energy
- Play Trainer Card
- Retreat
- Use Ability
- Attack
- Mulligan

### Relationships
- Performed by: [Player](#entity-player)
- Affects: [Game State](#entity-game-state), [Pokémon Card](#entity-pokémon-card)

### References
- See: "Turn Actions"

---

## Entity: Game State

### Name
Game State

### Type
State

### Description
The current configuration of all cards, zones, and states in the game.

### Attributes
- All cards in play, hand, deck, discard, prize
- All Pokémon states (Active, Benched, Special Conditions, etc.)

### Relationships
- Changed by: [Actions](#entity-action)

### References
- See: "Zones of the Pokémon TCG", "Turn Actions"

---

# End of Entities Reference
