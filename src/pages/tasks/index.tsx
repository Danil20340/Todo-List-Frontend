import { Table, TableHeader, TableColumn, TableRow, TableBody, TableCell, Spinner, Button } from "@heroui/react";
import { useGetAllQuery } from "../../app/services/taskAPI";
import dayjs from "dayjs";
import { Tag } from "../../components/tag";
import { useState } from "react";
import { LogOut, Plus } from "lucide-react";
import { EditTaskModal } from "../../components/edit-task-modal";
import { CreateTaskModal } from "../../components/create-task-modal";
import { TaskFilter } from "../../components/task-filter";
import React from "react";
import { Task } from "../../app/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrent } from "../../features/authSlice";

const filterByDeadline = (tasks: any[], type: string) => {
  const today = dayjs();
  return tasks.filter(task => {
    const due = dayjs(task.due_date);
    switch (type) {
      case 'today':
        return due.isSame(today, 'day');
      case 'week':
        return due.isBefore(today.add(7, 'day'));
      case 'future':
        return due.isAfter(today.add(7, 'day'));
      default:
        return true;
    }
  });
};
export const Tasks = () => {
  const { data, isLoading } = useGetAllQuery();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [deadlineFilter, setDeadlineFilter] = React.useState('all');
  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth')
  }

  const handleSelectionChange = (keys: any) => {
    setSelectedTask(keys);
    const selectedId = Array.from(keys)[0];
    const selectedItem = data?.find((item) => item.id === Number(selectedId));

    if (selectedItem) {
      setSelectedTask(selectedItem);
      setEditIsOpen(true);
    }
  };
  const handleAddNew = () => {
    setCreateIsOpen(true);
  };
  const handleCloseModal = () => {
    setEditIsOpen(false);
    setSelectedTask(null);
  };

  if (!data) return null;
  const filtered = filterByDeadline(data, deadlineFilter);

  const sortedByUpdate = filtered.sort((a, b) => {
    const aDate = a.updated_at ? dayjs(a.updated_at).valueOf() : 0;
    const bDate = b.updated_at ? dayjs(b.updated_at).valueOf() : 0;
    return bDate - aDate;
  });

  const groupMap: Record<string, Task[]> = {};
  sortedByUpdate.forEach((task) => {
    if (!groupMap[task.assignee_name]) groupMap[task.assignee_name] = [];
    groupMap[task.assignee_name].push(task);
  });

  const groupedTasks = Object.entries(groupMap);
  
  const getColor = (status: string, due_date: string) => {
    const today = dayjs().startOf("day");
    const due = dayjs(due_date);
    if (status === "done") return "text-green-600 font-bold";
    if (due.isBefore(today)) return "text-red-600 font-bold";
    return "text-gray-600 font-bold";
  };
  return (
    <>
      <div className="flex-col gap-4 mt-20 grid">
        <div className="flex flex-col sm:flex-row justify-between items-center ps-4 pe-4 gap-4">
          <h2 className="text-xl font-bold">Список задач</h2>
          <div className="flex gap-4 flex-col sm:flex-row">
            <TaskFilter deadlineFilter={deadlineFilter} onFilterChange={setDeadlineFilter} />
            {!current?.manager_id && <Button
              color="primary"
              endContent={<Plus size={18} />}
              onPress={handleAddNew}
              variant="flat"
            >
              Добавить задачу
            </Button>}
            <Button onPress={() => { handleLogout() }} className="min-w-[40px]" color="primary">
              <LogOut size={20} />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto grid">
          <Table
            aria-label="Tasks table"
            selectionMode="single"
            selectedKeys={selectedTask ? [selectedTask.id.toString()] : []}
            onSelectionChange={handleSelectionChange}
            color="primary"
            classNames={{
              wrapper: "max-h-[500px] min-w-[700px]",
            }}
          >
            <TableHeader>
              <TableColumn className="text-base text-black">Задача</TableColumn>
              <TableColumn className="text-base text-black">Ответственный</TableColumn>
              <TableColumn className="text-base text-black">Дата окончания</TableColumn>
              <TableColumn className="text-base text-black">Приоритет</TableColumn>
              <TableColumn className="text-base text-black">Статус</TableColumn>
            </TableHeader>

            <TableBody isLoading={isLoading} loadingContent={<Spinner label="Загрузка..." />} items={groupedTasks.flatMap(([_, tasks]) => tasks)}
              emptyContent={"Задачи отсутствуют"} >
              {(item) => (
                <TableRow className="cursor-pointer" key={item.id}>
                  <TableCell className={getColor(item.status, item.due_date)}>{item.title}</TableCell>
                  <TableCell>{item.assignee_name}</TableCell>
                  <TableCell>{dayjs(item.due_date).format("DD.MM.YYYY")}</TableCell>
                  <TableCell><Tag type="priority" value={item.priority} /></TableCell>
                  <TableCell><Tag type="status" value={item.status} /></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div >
      {selectedTask && (
        <EditTaskModal
          editIsOpen={editIsOpen}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      )}

      <CreateTaskModal
        createIsOpen={createIsOpen}
        onClose={() => setCreateIsOpen(false)}
      />
    </>
  );
};