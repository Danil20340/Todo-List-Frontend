import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { PriorityDropdown } from "../priority-dropdown";
import { AssigneeDropdown } from "../assignee-dropdown";
import { useForm } from "react-hook-form";
import { Task } from "../../app/types";
import { hasErrorField } from "../../utils/has-error-field";
import { useState } from "react";
import { ControlledTextarea } from "../text-area";
import { ControlledDatePicker } from "../date-picker";
import { Input } from "../input";
import { useCreateMutation } from "../../app/services/taskAPI";

type Props = {
    createIsOpen: boolean;
    onClose: () => void;
};
type CreateTask = {
    title: Task["title"];
    description: Task["description"];
    due_date: Task["due_date"];
    priority: Task["priority"];
    status: Task["status"];
    assignee_id: Task["assignee_id"];
}
export const CreateTaskModal: React.FC<Props> = ({ createIsOpen, onClose }) => {
    const [_, setError] = useState("")
    const [create] = useCreateMutation();
    const {
        handleSubmit,
        control
    } = useForm<CreateTask>({
        mode: 'onChange',
        reValidateMode: 'onBlur'
    });
    const onSubmit = async (data: CreateTask) => {
        try {
            const fullTask = {
                ...data,
                due_date: data.due_date.toString(),
            };
            await create(fullTask as Task).unwrap();
            onClose();
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };
    
    return (
        <Modal isOpen={createIsOpen} onClose={onClose} scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-primary">
                    Создание задачи
                </ModalHeader>
                <ModalBody className="flex flex-col gap-5 text-sm">
                    <Input required="Обязательное поле" control={control} name="title" label="Название задачи" color="primary" />
                    <ControlledTextarea control={control} name="description" label="Описание задачи" />

                    <div className="flex flex-col sm:flex-row gap-2 ">
                        <div className="flex flex-col gap-2 text-primary w-full">
                            <strong>Приоритет:</strong>
                            <PriorityDropdown control={control} name="priority" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 ">
                        <ControlledDatePicker
                            control={control}
                            name="due_date"
                            label="Дата окончания"
                            required="Обязательное поле"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <strong className="text-primary">Ответственный:</strong>
                        <AssigneeDropdown control={control} name="assignee_id" />
                    </div>
                </ModalBody>
                <ModalFooter className="justify-center" >
                    <Button className="min-w-[200px]" type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                        Создать
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
