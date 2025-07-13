import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import type { RootState } from "../store/store";
import type { Task } from "../types/Task";
import '../styles/tasklist.sass'
import { Button } from 'antd';
import { completedTask, deleteTask } from '../store/tasksSlice'
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const tasks = useSelector((state: RootState) => state.tasks.tasks as Task[]);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [taskListTitle, setTaskListTitle] = useState<string | null>('');

    const currentFilter = (
        location.pathname === '/active' ? 'active' :
            location.pathname === '/done' ? 'done' :
                undefined
    );

    const editButton = (id: number) => {
        setEditingTaskId(id);
        navigate(`/edit/${id}`);
    };

    const filteredTasks = useMemo(() => {
        if (!currentFilter) {
            setTaskListTitle('Все задачи');
            return tasks;
        }
        if (currentFilter === 'active') {
            setTaskListTitle('Активные задачи');
            return tasks.filter(task => !task.completed);
        }
        if (currentFilter === 'done') {
            setTaskListTitle('Завершённые задачи');
            return tasks.filter(task => task.completed);
        }
        return tasks;
    }, [tasks, currentFilter]);

    return (
        <>
            <h1>ToDoList/{taskListTitle}</h1>
            <div className="task-list">
                {filteredTasks.map((task: Task) => (
                    <div key={task.id} className="task-list__item">
                        <div className="task-list__content">
                            <h3>{task.title}</h3>
                            <div>{task.description}</div>
                            <div>{task.completed ? 'Выполнено' : 'В процессе'}</div>
                        </div>
                        <div className="task-list__nav">
                            <Button onClick={() => dispatch(completedTask(task.id))}
                                className="task-list__item-button"
                                type="text">{task.completed ? 'Не выполнено' : 'Выполнено'}
                            </Button>
                            <Button className="task-list__item-button"
                                onClick={() => editButton(task.id)}
                                type="text">Редактировать
                            </Button>
                            <Button className="task-list__item-button"
                                onClick={() => dispatch(deleteTask(task.id))}
                                type="text">Удалить
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!editingTaskId} id={editingTaskId} onClose={() => setEditingTaskId(null)} />
        </>
    )
}

export default TaskList;