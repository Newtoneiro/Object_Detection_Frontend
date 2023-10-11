export type IUserInputProps = {
  value: string;
  changeValue: (text: string) => void;
  options: IUserInputOptions;
};

export type IUserInputOptions = {
  isAlert: boolean;
  isSecret: boolean;
  placeholder: string;
  icon: "envelope" | "lock" | null;
};
