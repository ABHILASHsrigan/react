import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, update } from '../features/todoSlice';

function TodoComponent() {
    const [valueAdd, setvalueAdd] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.value);

    const handleAddOrUpdateTodo = () => {
        if (valueAdd.trim()) {
            if (editIndex !== null) {
                dispatch(update({ index: editIndex, title: valueAdd }));
                setEditIndex(null);
            } else {
                dispatch(add(valueAdd));
            }
            setvalueAdd('');
        }
    };

    const handleEdit = (i) => {
        setvalueAdd(todos[i].title);
        setEditIndex(i);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>TODO APP </h2>

            <div>
                <input
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        position: 'absolute',
                        left: '500px',
                        top: '200px'
                    }}
                    type="text"
                    value={valueAdd}
                    onChange={(e) => setvalueAdd(e.target.value)}
                />
                <button
                    onClick={handleAddOrUpdateTodo}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '5px',
                        border: 'none',
                        background: editIndex !== null ? '#ffc107' : '#28a745',
                        color: '#fff',
                        cursor: 'pointer',
                        position: 'absolute',
                        left: '850px',
                        top: '200px'
                    }}
                >
                    {editIndex !== null ? 'Update Todo' : 'Add Todo'}
                </button>
            </div>

            <ul>
                {todos.map((item, i) => (
                    <li
                        style={{
                            position: 'absolute',
                            left: '550px',
                            top: `${300 + i * 40}px`
                        }}
                        key={i}
                    >
                        {item.title} - {item.status ? 'Completed' : 'In Completed'}
                        <button onClick={() => handleEdit(i)} style={{ marginLeft: '10px' }}>Edit</button>
                        <button onClick={() => dispatch(remove(i))} style={{ marginLeft: '5px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoComponent;
