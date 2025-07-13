import React from "react";
import ReactDOM from 'react-dom';
import '../styles/modal.sass'
import { Input } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addTask, selectTaskById, updateTask } from "../store/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const task = useSelector((state: RootState) =>
        id ? selectTaskById(state, id) : null
    );

    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [inputError, setErrorInput] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [task]);

    const saveTask = () => {
        if (!title || !description) {
            setErrorInput(true);
            return
        }

        setErrorInput(false);

        const newTask = {
            id: id || Date.now().toString(),
            title,
            description,
            completed: task?.completed || false,
        };

        if (id && task) {
            dispatch(updateTask(newTask));
        } else {
            dispatch(addTask(newTask));
        }

        setTitle('');
        setDescription('');
        onClose();

    }

    const closeModal = () => {
        onClose();
        navigate(`/`);
    };

    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root') as HTMLElement;

    return ReactDOM.createPortal(
        <div className="modal__overlay">
            <div className="modal__content">
                <h2>{id ? 'Редактировать задачу' : 'Добавить задачу'}</h2>
                <div className="modal__input-item">
                    <label>Название задачи</label>
                    <Input style={{ width: '420px' }}
                        value={title}
                        placeholder="Введите название задачи"
                        className={inputError ? 'input-error' : ''}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="modal__input-item">
                    <label>Описание задачи</label>
                    <TextArea
                        value={description}
                        placeholder="Введите описание задачи"
                        style={{ width: '420px' }}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        className={inputError ? 'input-error' : ''}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="modal__nav">
                    <button onClick={saveTask}>{id ? 'Сохранить' : 'Добавить'}</button>
                    <button onClick={() => closeModal()}>Закрыть</button>
                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default Modal;
