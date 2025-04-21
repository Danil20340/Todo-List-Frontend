import { Chip } from "@heroui/react";
import {
  Loader2,
  Check,
  XOctagon,
  Hourglass,
} from "lucide-react";

type Props = {
  type: "priority" | "status";
  value: string;
};

const PRIORITY_MAP: Record<
  string,
  { color: "primary" | "warning" | "danger" | "default"; label: string }
> = {
  low: { color: "primary", label: "Низкий" },
  medium: { color: "warning", label: "Средний" },
  high: { color: "danger", label: "Высокий" },
};

const STATUS_MAP: Record<
  string,
  {
    color: "default" | "warning" | "success" | "danger";
    label: string;
    icon?: React.ReactNode;
  }
> = {
  pending: {
    color: "default",
    label: "В ожидании",
    icon: <Hourglass size={16} />,
  },
  in_progress: {
    color: "warning",
    label: "В процессе",
    icon: <Loader2 size={16} className="animate-spin" />,
  },
  done: {
    color: "success",
    label: "Выполнено",
    icon: <Check size={16} />,
  },
  cancelled: {
    color: "danger",
    label: "Отменено",
    icon: <XOctagon size={16} />,
  },
};

export const Tag: React.FC<Props> = ({ type, value }) => {
  if (type === "priority") {
    const { color, label } = PRIORITY_MAP[value] || {
      color: "default",
      label: value,
    };

    return (
      <Chip className="text-black" color={color}>
        {label}
      </Chip>
    );
  }

  if (type === "status") {
    const { color, label, icon } = STATUS_MAP[value] || {
      color: "default",
      label: value,
    };

    return (
      <Chip className="text-black" color={color} startContent={icon}>
        {label}
      </Chip>
    );
  }

  return null;
};
