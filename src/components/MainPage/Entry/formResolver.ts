import { Resolver } from "react-hook-form";
import { EntryDB } from "../../types";

interface ErrorType {
  type: string;
  message: string;
}
type Error = {
  [key in string]: ErrorType;
};

export const resolver: Resolver<EntryDB> = async (values) => {
  return {
    values: values.character ? values : {},
    errors: !values.character
      ? {
          character: {
            type: "required",
            message: "required",
          },
        }
      : {},
  };
};
