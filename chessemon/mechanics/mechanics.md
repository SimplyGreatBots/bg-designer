# Chessemon Mechanics

## Turn Structure
1. **Draw Phase**: Draw 1 card from your deck (max hand size: 7).
2. **Action Phase** (choose any/all, in any order):
   - Move one or more Chessemon (each may move once, unless a card/ability says otherwise)
   - Play cards from your hand (Move, Evolution, Item)
   - Attack with Chessemon (each may attack once, unless a card/ability says otherwise)
   - Evolve Pawnmon (once per Pawnmon per turn)
3. **End Phase**: Discard down to 7 cards if needed. Resolve end-of-turn effects.

## Movement & Actions
- Chessemon move as described in their entity profile (see entities.md).
- Move Cards may grant extra movement or special moves.
- Attacks target adjacent or specified zones; deal ATK damage to target’s HP.
- If a Chessemon’s HP drops to 0, it is captured and sent to the Bench.

## Card Play
- Play any number of cards during your Action Phase.
- Move Cards: Grant extra movement or special attacks.
- Evolution Cards: Evolve a Pawnmon into a higher form (place new piece, keep damage).
- Item Cards: Provide buffs, healing, or protection.

## Evolution
- To evolve, play the appropriate Evolution Card on a Pawnmon.
- Replace Pawnmon with the evolved piece; retain any damage.
- Each Pawnmon may only evolve once per turn.

## Combat
- Declare an attack with an Active Chessemon.
- Target must be in range (adjacent unless otherwise specified).
- Attacker deals ATK damage to target’s HP.
- If target’s HP is reduced to 0, it is captured (move to Bench).
- Some cards/abilities may modify damage or allow counterattacks.

## Special Abilities
- Each Chessemon and some cards have unique effects (see entities.md for examples).
- Abilities may be passive (always on) or activated (once per game/turn).

## Example Turn
1. Draw a card (now have 6 cards in hand).
2. Move Pawnmon forward 1 square.
3. Play “Evolve to Knightmon” on Pawnmon; replace with Knightmon.
4. Attack with Knightmon (L-shape move, then attack adjacent enemy for 2 damage).
5. Play “Potion” to heal Bishopmon.
6. End turn; hand size is 4.

## Board Setup
- Each player’s Home Zone is a 2x4 area at their board edge.
- The Battle Zone is a 4x4 central area.
- Place 1 Kingmon and 6 Pawnmon per player in Home Zone at start.

## Deck Construction
- 30 cards per deck (any mix of Move, Evolution, Item cards).

## Victory
- Capture the opponent’s Kingmon, or fulfill a special win condition from a card.
