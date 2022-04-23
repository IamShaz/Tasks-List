import './header.css';

function Header(props) {

  return (
    <div>
      <header className="App-header"></header>
      <div><h1>Tasks List</h1></div>
      <div className="numberOfItems">
        <span>
        {
          props.list.filter(item => {
            if (item.status === 'active') {
              return item;
            }
          }).length
        }
        </span>&nbsp;Active Tasks
      </div>
    </div>
  );
}

export default Header;
