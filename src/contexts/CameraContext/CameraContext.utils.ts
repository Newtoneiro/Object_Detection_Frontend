/**
 * @file CameraContext.utils.ts
 * @description CameraContext Utils.
 */

import { ICameraDimensions, Ratio } from "../../config";

/**
 * Calculates the camera's height from the given width and ratio.
 * @function calculateHeightFromWidth
 * @param {Ratio} ratio - The camera's ratio.
 * @param {number} width - The camera's width.
 *
 * @returns {number} - The calculated camera's height.
 *
 * @example
 * calculateHeightFromWidth("4:3", 100);
 * // => 75
 *
 * @see {@link Ratio} for ratio type.
 * @see {@link ICameraDimensions} for camera dimensions interface.
 */
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
