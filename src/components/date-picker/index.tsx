import { DatePicker } from "@heroui/react";
import { Controller, Control } from "react-hook-form";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";

type Props = {
  control: Control<any>;
  name: string;
  label?: string;
  minValue?: DateValue;
  defaultValue?: DateValue;
  color?: "primary" | "warning" | "danger";
  required?: string;
  readonly?: boolean;
};

export const ControlledDatePicker: React.FC<Props> = ({
  control,
  name,
  label = "Дата",
  defaultValue,
  color = "warning",
  required,
  readonly
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error, invalid } }) => (
        <DatePicker
          isReadOnly={readonly}
          {...field}
          defaultValue={defaultValue}
          value={field.value}
          onChange={field.onChange}
          minValue={today(getLocalTimeZone())}
          label={label}
          color={color}
          isInvalid={invalid}
          errorMessage={error?.message}
        />
      )}
    />
  );
};
