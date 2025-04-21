import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Check, Hourglass, Loader2, XOctagon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/authSlice";

const statusMap = {
  done: { label: "Выполнено", color: "success", icon: <Check size={16} /> },
  pending: { label: "В ожидании", color: "default", icon: <Hourglass size={16} /> },
  in_progress: {
    label: "В процессе",
    color: "warning",
    icon: <Loader2 size={16} className="animate-spin" />,
  },
  cancelled: { label: "Отменено", color: "danger", icon: <XOctagon size={16} /> },
} as const;

type StatusKey = keyof typeof statusMap;

type Props = {
  control: any;
  name: string;
};

export const StatusDropdown: React.FC<Props> = ({ control, name }) => {
  const current = useSelector(selectCurrent);
  const isDisabled = !!current?.manager_id;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedKey = field.value as StatusKey;
        const selected = statusMap[selectedKey] || "Выбрать статус";

        const handleChange = (keys: any) => {
          const value = keys instanceof Set ? [...keys][0] : keys?.currentKey;
          field.onChange(value);
        };

        return (
          <Dropdown>
            <DropdownTrigger disabled={isDisabled && selected.label === "Отменено"}>
              <Button
                startContent={selected.icon}
                className="capitalize"
                variant="solid"
                color={selected.color}
              >
                {selected.label ?? selected}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={isDisabled ? ["cancelled"] : []}
              disallowEmptySelection
              selectedKeys={new Set([selectedKey])}
              selectionMode="single"
              onSelectionChange={handleChange}
            >
              {Object.entries(statusMap).map(([key, { label, color, icon }]) => (
                <DropdownItem
                  key={key}
                  color="primary"
                  startContent={icon}
                  className={`capitalize bg-${color}`}

                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        );
      }}
    />
  );
};
