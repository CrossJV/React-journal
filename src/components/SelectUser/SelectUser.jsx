import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser() { 
	const { setUserId } = useContext(UserContext);
	const changeUser = (evt) => {
		setUserId(Number(evt.target.value));
	};

	return (
		<select className={styles['select']} name="user" id="user" onChange={changeUser}>
			<option value="1">Yuri</option>
			<option value="2">Andrew</option>
		</select>
	);
}

export default SelectUser;