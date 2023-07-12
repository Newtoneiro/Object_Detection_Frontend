import { IProps } from "../../../config.types";

export type IBackgroundProps = IProps & {
  handlePressFunction: null | (() => void);
};
