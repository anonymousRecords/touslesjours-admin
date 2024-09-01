import { sandwichRows } from "../constants";

export const weekdayFromNumber = (numberOrString: number | string) => {
  if (typeof numberOrString === 'number') {
    const index = numberOrString % 7;
    return sandwichRows[index];
  }

  if (typeof numberOrString === 'string') {
    const index = sandwichRows.indexOf(numberOrString);
    if (index !== -1) {
      return sandwichRows[index];
    }

    return 'weekdayFromNumber Error: Invalid input';
  }

  return 'weekdayFromNumber Error: Invalid input';
};
