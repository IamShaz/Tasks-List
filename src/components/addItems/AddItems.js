import './addItems.css';
import React, { useState, useRef } from 'react';
import { filterText, getIdFromLSList } from '../../utils/utils';
import _ from 'lodash';

function AddItems(props) {

    const [taskValue, setTaskValue] = useState('');
    const itemValue = useRef(null);

    const addItem = () => {
        console.log(itemValue)
        if (itemValue.current.value !== '') {
            props.setList([
                ...props.list, {
                    'itemValue': filterText(taskValue),
                    'status': 'active',
                    'disabled': true,
                    'id': _.uniqueId(`task-${getIdFromLSList()}`)
                }])

            itemValue.current.value = '';
        }
    }

    return (
        <div className="addItems">
            <div className="itemContainer flexCenter">
                <input className="listItem" ref={itemValue} onChange={(e) => setTaskValue(e.target.value)} type="text" name="listItem" placeholder="Add Task" autoFocus />
                <button className="addButton flexCenter" {...(itemValue.current?.value !== '' && { onClick: () => { addItem() } })}><span>+</span></button>
            </div>
        </div>
    );
}

export default AddItems;
