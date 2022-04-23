import './save.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

function Save(props) {

  const [showBanner, setShowBanner] = useState(false);

  const saveList = () => {
    localStorage.setItem('tastslist', JSON.stringify(props.list));
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  }

  return (
    <div>
      <div className={`saveBanner flexCenter ${showBanner ? 'show' : ''}`}>Saved&nbsp;&#10003;</div>
      <button className="save" onClick={saveList}>
        <FontAwesomeIcon className="icon" icon={faFloppyDisk} />Save
      </button>
    </div>
  );
}

export default Save;
