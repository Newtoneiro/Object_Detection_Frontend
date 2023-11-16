import { globalTypes } from "../../../config";

export type IGradientButtonProps = globalTypes.IProps & {
  handlePressFunction: () => void;
};
