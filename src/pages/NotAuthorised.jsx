import { Link } from 'react-router-dom';

function NotAuthorised(props) {
  return (
    <div className='container'>
      <h1>Only for regisered users</h1>
      <p>
        Please login <Link to={'/auth'}>here</Link>
      </p>
    </div>
  );
}
export default NotAuthorised;
