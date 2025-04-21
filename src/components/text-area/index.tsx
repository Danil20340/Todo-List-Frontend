import { Controller } from "react-hook-form";
import { Textarea } from "@heroui/react";

type Props = {
  name: string;
  control: any;
  label: string;
  readonly?: boolean;
};

export const ControlledTextarea: React.FC<Props> = ({ name, control, label, readonly }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <Textarea
        {...field}
        readOnly={readonly}
        label={label}
        color="primary"
        isInvalid={!!fieldState.error}
        errorMessage={fieldState.error?.message}
        maxLength={1000}
      />
    )}
  />
);
