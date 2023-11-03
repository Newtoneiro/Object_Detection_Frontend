import { IProps } from "../../../config/config.types";

export type IBackgroundProps = IProps & {
  handlePressFunction: null | (() => void);
};
