import { ReactElement, ReactNode } from "react";

export interface IProps {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | ReactElement
    | "() => JSX.Element"
    | ReactNode;
}

export const possibleRatios = ["4:3", "16:9"];
export type Ratio = (typeof possibleRatios)[number];

export const possibleQualities = ["0.1", "0.5", "0.7", "1.0"];
export type Quality = (typeof possibleQualities)[number];

export const possibleFrameRates = ["1", "2", "5", "10", "20", "30"];
export type FrameRate = (typeof possibleFrameRates)[number];
