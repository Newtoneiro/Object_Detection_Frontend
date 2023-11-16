export interface IUserInputProps {
  value: string;
  changeValue: (text: string) => void;
  options: IUserInputOptions;
}

export interface IUserInputOptions {
  isAlert: boolean;
  isSecret: boolean;
  placeholder: string;
  icon: "envelope" | "lock" | null;
}
