import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, DateValue } from "@heroui/react";
import { StatusDropdown } from "../status-dropdown";
import { PriorityDropdown } from "../priority-dropdown";
import dayjs from "dayjs";
import { AssigneeDropdown } from "../assignee-dropdown";
import { useForm } from "react-hook-form";
import { Task, TaskPriority, TaskStatus } from "../../app/types";
import { useDeleteMutation, useUpdateMutation } from "../../app/services/taskAPI";
import { hasErrorField } from "../../utils/has-error-field";
import { useEffect, useState } from "react";
import { ControlledTextarea } from "../text-area";
import { ControlledDatePicker } from "../date-picker";
import { getParsedLocalDate } from "../../utils/getParsedLocalDate";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/authSlice";
import { Input } from "../input";

type Props = {
    editIsOpen: boolean;
    onClose: () => void;
    task: Task | null;
};

type TaskForm = {
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    assignee_id: number | null;
    due_date: DateValue;
};

export const EditTaskModal: React.FC<Props> = ({ editIsOpen, onClose, task }) => {
    if (!task) return null;
    const current = useSelector(selectCurrent);
    const [update] = useUpdateMutation();
    const [deleteTask] = useDeleteMutation();
    const [_, setError] = useState("")
    const {
        handleSubmit,
        control,
        reset
    } = useForm<TaskForm>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: task
            ? {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                assignee_id: task.assignee_id,
                due_date: getParsedLocalDate(task.due_date),
            }
            : undefined
    });
    const onSubmit = async (data: TaskForm) => {
        try {

            const { assignee_name, creator_name, ...taskData } = task;

            const fullTask = {
                ...taskData,
                ...data,
                due_date: data.due_date.toString(),
            };
            await update(fullTask as Task).unwrap();
            onClose();
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };
    const onDelete = async () => {
        try {
            await deleteTask(task).unwrap();
            onClose();
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };
    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                assignee_id: task.assignee_id,
                due_date: getParsedLocalDate(task.due_date),
            });
        }
    }, [task, reset]);
    return (
        <Modal isOpen={editIsOpen} onClose={onClose} scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-primary">
                    {!current?.manager_id ? "Редактирование задачи" : `Задача: ${task.title}`}
                </ModalHeader>
                <ModalBody className="flex flex-col gap-5 text-sm">
                    {!current?.manager_id && <Input required="Обязательное поле" control={control} name="title" label="Название задачи" color="primary" />}
                    <ControlledTextarea readonly={!!current?.manager_id} control={control} name="description" label="Описание задачи" />

                    <div className="flex flex-col sm:flex-row gap-2 ">
                        <div className="flex flex-col gap-2 text-primary w-full">
                            <strong>Приоритет:</strong>
                            <PriorityDropdown control={control} name="priority" />
                        </div>
                        <div className="flex flex-col gap-2 text-primary w-full">
                            <strong>Статус:</strong>
                            <StatusDropdown control={control} name="status" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row justify-between">
                        <Chip color="primary">Дата создания: {dayjs(task.created_at).format("DD.MM.YYYY")}</Chip>
                        <Chip color="primary">{task.updated_at ? "Дата изменения: " + dayjs(task.updated_at).format("DD.MM.YYYY") : "Не обновлено"}</Chip>
                    </div>
                    <div className="w-full flex flex-col gap-1 ">
                        <ControlledDatePicker
                            readonly={!!current?.manager_id}
                            control={control}
                            name="due_date"
                            label="Дата окончания"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <strong className="text-primary">Ответственный:</strong>
                        <AssigneeDropdown control={control} name="assignee_id" />
                    </div>
                    <Chip className="text-white" color="success">Создатель {task.creator_name}</Chip>
                </ModalBody>
                <ModalFooter className="flex flex-col sm:flex-row gap-2 justify-between">
                    {!current?.manager_id &&
                        <Button color="danger" onClick={handleSubmit(onDelete)}>
                            Удалить
                        </Button>
                    }
                    {(current?.id === task.creator_id || (current?.id === task.assignee_id && task.status !== "cancelled")) && (
                        <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                            Изменить
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
