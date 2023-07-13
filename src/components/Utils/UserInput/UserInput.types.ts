export type IOptions = {
  isAlert: boolean;
  isSecret: boolean;
  placeholder: string;
  icon: "envelope" | "lock" | null;
};

export type IUserInputProps = {
  value: string;
  changeValue: (text: string) => void;
  options: IOptions;
};
