import './lists.css';
import React, { useRef } from 'react';
import { filterText } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

function Lists(props) {

    const activeRefs = useRef([]);
    const inactiveRefs = useRef([]);

    const toggleItem = (listItem, status) => {
        listItem.status = status;
        const copy = [...props.list];
        props.setList(copy);
    }

    const deleteItem = (listItem) => {
        const copy = [...props.list].filter(item => item !== listItem);
        props.setList(copy);
    }

    const editItem = (listItem, i, status) => {
        listItem.disabled = false;

        const copy = [...props.list];
        props.setList(copy);

        switch (status) {
            case 'inactive':
                inactiveRefs.current[i]?.removeAttribute('disabled');
                inactiveRefs.current[i]?.focus();
                break;
            default:
                activeRefs.current[i]?.removeAttribute('disabled');
                activeRefs.current[i]?.focus();
                break;
        }

    }

    const toggleEdit = (listItem, i, status) => {
        listItem.disabled = true;

        status === 'active'
            ? activeRefs.current[i].value = listItem.itemValue
            : inactiveRefs.current[i].value = listItem.itemValue;

        const copy = [...props.list];
        props.setList(copy);
    }

    const updateEdit = (listItem, e) => {
        listItem.itemValue = filterText(e.target.value);

        const copy = [...props.list];
        props.setList(copy);
    }

    const loadList = (status) => {
        const title = status === 'active' ? <h2>Active Tasks</h2> : <h2>Completed Tasks</h2>;
        const loadTextarea = (item, i) => {
            return status === 'active'
                ? <textarea className="itemText" ref={el => activeRefs.current[i] = el} onChange={(e) => updateEdit(item, e)} onBlur={() => toggleEdit(item, i, status)} disabled={item.disabled} defaultValue={item.itemValue}></textarea>
                : <textarea className="itemText" ref={el => inactiveRefs.current[i] = el} onChange={(e) => updateEdit(item, e)} onBlur={() => toggleEdit(item, i, status)} disabled={item.disabled} defaultValue={item.itemValue}></textarea>
        }
        const list = <ol>
            {
                props.list.filter(i => {
                    if (i.status === status) {
                        return i
                    }
                }).map((item, i) => {
                    return <li key={item.id} className={`flexCenter ${status}`}>
                        <label className="checkboxContainer">
                            <input type="checkbox" />
                            <span onClick={() => toggleItem(item, status === 'active' ? 'inactive' : 'active')} className="checkmark flexCenter"></span>
                        </label>
                        {loadTextarea(item, i)}
                        <FontAwesomeIcon className='icon' onClick={() => editItem(item, i, status)} icon={faPencil} />
                        <FontAwesomeIcon className='icon' onClick={() => deleteItem(item)} icon={faXmark} />
                    </li>
                })
            }
        </ol>
        return (
            <>
                {title}
                {list}
            </>
        )
    }

    return (
        <div className="lists">
            <div className="allActiveItems list">
                {loadList('active')}
            </div>

            <div className="allInactiveItems list">
                {loadList('inactive')}
            </div>
        </div>

    );
}

export default Lists;
