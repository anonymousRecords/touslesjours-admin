import { sandwichRows } from "@/constants";

export const weekdayFromNumber = (numberOrString) => {
    if (typeof numberOrString === 'number') {
      const index = (numberOrString) % 7;
      return sandwichRows[index];
    } else if (typeof numberOrString === 'string') {
      const index = sandwichRows.indexOf(numberOrString);
      if (index !== -1) {
        return index + 1;
      } else {
        return "weekdayFromNumber Error: Invalid input";
      }
    } else {
      return "weekdayFromNumber Error: Invalid input";
    }
  };