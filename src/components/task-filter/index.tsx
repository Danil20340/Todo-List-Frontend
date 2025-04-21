import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
  } from "@heroui/react";
  import { ChevronDownIcon } from "lucide-react";
  
  export const TaskFilter = ({ deadlineFilter, onFilterChange }: {
    deadlineFilter: string;
    onFilterChange: (value: string) => void;
  }) => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
            Срок: {deadlineFilter === 'all' ? 'Все' : deadlineFilter === 'today' ? 'Сегодня' : deadlineFilter === 'week' ? 'Неделя' : 'Будущее'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Срок задачи"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([deadlineFilter])}
          onSelectionChange={(keys) => onFilterChange(Array.from(keys)[0] as string)}
          color="primary"
        >
          <DropdownItem key="all">Все</DropdownItem>
          <DropdownItem key="today">Сегодня</DropdownItem>
          <DropdownItem key="week">Неделя</DropdownItem>
          <DropdownItem key="future">Будущее</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };