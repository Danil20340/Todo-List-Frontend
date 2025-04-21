import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useGetSubordinatesQuery } from "../../app/services/userAPI";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/authSlice";

type Props = {
  control: any;
  name: string;
};

export const AssigneeDropdown: React.FC<Props> = ({ control, name }) => {
  const { data: subordinates = [] } = useGetSubordinatesQuery();
  const current = useSelector(selectCurrent);
  const isDisabled = !!current?.manager_id;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Выберите исполнителя",
        validate: (value) =>
          subordinates.some((user) => user.id === value) || "Выберите исполнителя",
      }}
      render={({ field, fieldState: { error } }) => {
        const selectedId = field.value;
        const selectedUser = subordinates.find((user) => user.id === selectedId);
        const selectedLabel = selectedUser?.full_name || "Выбрать";

        const handleChange = (keys: any) => {
          const selectedKey = keys instanceof Set ? [...keys][0] : keys?.currentKey;
          const selectedUser = subordinates.find(
            (user) => user.id.toString() === selectedKey
          );
          if (selectedUser) {
            field.onChange(selectedUser.id);
            field.onBlur(); 
          }
        };

        return (
          <div className="flex flex-col gap-1">
            <Dropdown>
              <DropdownTrigger disabled={isDisabled}>
                <Button
                  color={error ? "danger" : "secondary"}
                  className="capitalize"
                  variant="solid"
                >
                  {selectedLabel}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Assignee selection"
                selectedKeys={selectedId ? new Set([String(selectedId)]) : new Set()}
                selectionMode="single"
                onSelectionChange={handleChange}
                items={subordinates}
              >
                {(item) => (
                  <DropdownItem key={item.id}>
                    {item.full_name}
                  </DropdownItem>
                )}
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
