// Define the types
export type Cosmie = "jambi" | "glacepom" | "suburaku" | "grassol";
export type Stat =
  | "tackle"
  | "evade"
  | "shield"
  | "specialMove"
  | "accuracy"
  | "hp";

// Define the structure of the cosmiesUpscore object
const cosmiesUpscore: Record<Cosmie, Record<Stat, number>> = {
  jambi: {
    tackle: 2,
    evade: 2,
    shield: 2,
    specialMove: 2,
    accuracy: 1,
    hp: 3,
  },
  glacepom: {
    tackle: 4,
    evade: 3,
    shield: 2,
    specialMove: 4,
    accuracy: 1,
    hp: 3,
  },
  suburaku: {
    tackle: 6,
    evade: 4,
    shield: 1,
    specialMove: 6,
    accuracy: 3,
    hp: 1,
  },
  grassol: {
    tackle: 1,
    evade: 1,
    shield: 5,
    specialMove: 1,
    accuracy: 4,
    hp: 5,
  },
};

export function getDiceRoll(player: Cosmie, action: Stat): number {
  const lowerCasePlayer = player.toLowerCase() as Cosmie;

  //to account for specialMoves
  const validAction =
    action in cosmiesUpscore[lowerCasePlayer]
      ? (action as Stat)
      : "specialMove";

  const amount = cosmiesUpscore[lowerCasePlayer][validAction];
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const finalValue = randomNumber + amount;
  return finalValue;
}

//treating defense as defense - attack
export function attackOnDefense(defense: number, attack: number): number {
  const result = attack - defense;
  return result > 0 ? result : 0;
}

//treating defense as defense - attack
export function attackOnEvade(evade: number, attack: number): number {
  const result = Math.floor(attack / evade);
  return result;
}
