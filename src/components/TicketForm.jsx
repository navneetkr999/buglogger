import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';

const TicketForm = ({ dispatch, editingTicket }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High',
    }
    useEffect(() => {

        if (editingTicket) {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
        } else {
            clearForm();
        }

    }, [editingTicket]);

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            id: editingTicket ? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority
        }
        console.log(ticketData);

        dispatch({
            type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
            payload: ticketData
        })

        clearForm();
    }

    const handleCancel = () => {

        dispatch({ type: "CLEAR_EDITING_TICKET", })
        clearForm();
    }

    return (
        <form onSubmit={handleSubmit} className='ticket-form'>
            <div>
                <label>Title</label>
                <input type="text" className='form-input' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Descrition</label>
                <textarea type="textarea" value={description} className='form-input' onChange={e => setDescription(e.target.value)} />
            </div>
            <fieldset className='priority-fieldset'>
                <legend>Priority</legend>
                {
                    Object.entries(priorityLabels).map(([value, label]) => (
                        <label key={value} className='priority-label'>
                            <input type="radio" value={value} checked={priority === value} className='priority-input' onChange={e => setPriority(e.target.value)} />
                            {label}
                        </label>
                    ))
                }
            </fieldset>
            <button type='submit' className='button' >Submit</button>
            {editingTicket && (
                <button className="button" onClick={handleCancel}>Cancel Edit</button>
            )}
        </form>
    )
}

export default TicketForm
