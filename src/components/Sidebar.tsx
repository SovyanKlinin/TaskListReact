import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCheck, faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.sass';
import { useState } from 'react';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = () => {
        setIsModalOpen(true);      
        navigate('/add');          
    };

    return (
        <>
            <aside className='aside'>
                <h2 className='aside__title'>
                    <FontAwesomeIcon icon={faListCheck} /> Список задач
                </h2>
                <ul className="aside__nav">
                    <li onClick={handleAddTask}>
                        <FontAwesomeIcon icon={faPlus} /> Добавить задачу
                    </li>
                    <li>
                        <Link className='aside__link' to='/'>
                            <FontAwesomeIcon icon={faListCheck} style={{ marginRight: '10px' }} />
                            Все задачи
                        </Link>
                    </li>
                    <li>
                        <Link className='aside__link' to='/active'>
                            <FontAwesomeIcon icon={faBarsProgress} style={{ marginRight: '10px' }} />
                            Активные
                        </Link>
                    </li>
                    <li>
                        <Link className='aside__link' to='/done'>
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
                            Завершённые
                        </Link>
                    </li>
                </ul>
            </aside>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}