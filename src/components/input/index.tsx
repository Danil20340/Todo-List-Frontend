import React, { JSX } from "react"
import { Control, useController } from "react-hook-form"
import { Input as NextInput } from "@heroui/react"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
  color?: "primary" | "warning" | "danger" | "default"
  readonly?: boolean
}

export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
  color,
  readonly
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required
    }
  })

  return (
    <NextInput
      readOnly={readonly}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value ?? ""}
      maxLength={50}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
      color={color}

    />
  )
}