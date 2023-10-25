import { Ratio } from "../../config.types";

const calculateHeightFromWidth = (ratio: Ratio, width: number): number => {
  let height = 0;
  switch (ratio) {
    case "4:3":
      height = (4 / 3) * width;
      break;
    case "16:9":
      height = (16 / 9) * width;
      break;
    default:
      height = 0;
      break;
  }

  return height;
};

export { calculateHeightFromWidth };
