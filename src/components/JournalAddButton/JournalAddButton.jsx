import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({ clearForm }) {
	return (
		<CardButton className="journal-add" onClick={clearForm}>
			<img className='add-button' src="/plus.svg" alt="Add" />
            Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;