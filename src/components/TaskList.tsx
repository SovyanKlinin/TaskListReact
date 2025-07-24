import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import type { RootState } from "../store/store";
import type { Task } from "../types/Task";
import '../styles/tasklist.sass'
import { Button } from 'antd';
import { completedTask, deleteTask, reorderTasks } from '../store/tasksSlice'
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import type { DragEndEvent } from '@dnd-kit/core';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

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
        console.log('Click!')
        setEditingTaskId(id);
        navigate(`/edit/${id}`);
    };

    const filteredTasks = useMemo(() => {
        if (!currentFilter) {
            return tasks;
        }
        if (currentFilter === 'active') {
            return tasks.filter(task => !task.completed);
        }
        if (currentFilter === 'done') {
            return tasks.filter(task => task.completed);
        }
        return tasks;
    }, [tasks, currentFilter]);

    useEffect(() => {
        if (!currentFilter) {
            setTaskListTitle('Все задачи');
        } else if (currentFilter === 'active') {
            setTaskListTitle('Активные задачи');
        } else if (currentFilter === 'done') {
            setTaskListTitle('Завершённые задачи');
        }
    }, [currentFilter]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = filteredTasks.findIndex(task => task.id === active.id);
        const newIndex = filteredTasks.findIndex(task => task.id === over.id);

        const reorderedTasks = arrayMove(filteredTasks, oldIndex, newIndex);

        dispatch(reorderTasks(reorderedTasks));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <>
            <h1>ToDoList/{taskListTitle}</h1>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={filteredTasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="task-list">
                        {filteredTasks.map((task: Task) => (
                            <SortableItem key={task.id} id={task.id}>
                                <div className="task-list__content">
                                    <h3>{task.title}</h3>
                                    <div>{task.description}</div>
                                    <div>{task.completed ? 'Выполнено' : 'В процессе'}</div>
                                </div>
                                <div className="task-list__nav">
                                    <Button onClick={() => dispatch(completedTask(task.id))}
                                        className="task-list__item-button"
                                        type="text">
                                        {task.completed ? 'Не выполнено' : 'Выполнено'}
                                    </Button>
                                    <Button
                                        className="task-list__item-button"
                                        onClick={() => editButton(task.id)}
                                        type="text">
                                        Редактировать
                                    </Button>
                                    <Button
                                        className="task-list__item-button"
                                        onClick={() => dispatch(deleteTask(task.id))}
                                        type="text">
                                        Удалить
                                    </Button>
                                </div>
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <Modal isOpen={!!editingTaskId} id={editingTaskId} onClose={() => setEditingTaskId(null)} />
        </>
    );
};

export default TaskList;