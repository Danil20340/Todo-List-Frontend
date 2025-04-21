import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { selectCurrent } from "../../features/authSlice";
import { useSelector } from "react-redux";

const priorityMap = {
  low: { label: "Низкий", color: "primary" },
  medium: { label: "Средний", color: "warning" },
  high: { label: "Высокий", color: "danger" },
} as const;

type PriorityKey = keyof typeof priorityMap;

type Props = {
  control: any;
  name: string;
};

export const PriorityDropdown: React.FC<Props> = ({ control, name }) => {
  const current = useSelector(selectCurrent);
  const isDisabled = !!current?.manager_id;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Выберите приоритет",
        validate: (value) =>
          Object.keys(priorityMap).includes(value) || "Выберите приоритет",
      }}
      render={({ field, fieldState: { error } }) => {
        const selectedKey = field.value as PriorityKey;
        const selected = priorityMap[selectedKey];

        const handleChange = (keys: any) => {
          const value = keys instanceof Set ? [...keys][0] : keys?.currentKey;
          field.onChange(value);
          field.onBlur();
        };

        return (
          <div className="flex flex-col gap-1">
            <Dropdown>
              <DropdownTrigger disabled={isDisabled}>
                <Button
                  className="capitalize"
                  variant="solid"
                  color={error?.message ? "danger" : selected?.color ?? "default"}
                >
                  {selected?.label ?? "Выбрать приоритет"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
                selectionMode="single"
                onSelectionChange={handleChange}
              >
                {Object.entries(priorityMap).map(([key, { label, color }]) => (
                  <DropdownItem
                    key={key}
                    className={`capitalize bg-${color}`}
                  >
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {error && (
              <span className="text-danger-500 text-xs mt-1">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

