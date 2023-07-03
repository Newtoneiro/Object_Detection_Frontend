import { ReactElement, ReactNode, ReactPortal } from "react";

export interface IProps {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | ReactElement
    | "() => JSX.Element"
    | ReactNode;
}
