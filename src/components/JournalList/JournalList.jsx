import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { createContext, useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

export const CardButtonContext = createContext({});

function JournalList({ items, setRecord }) {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if(a.date < b.date)
		{
			return 1;
		} else
		{
			return -1;
		}
	};

	const filterItems = (item) => {
		return item.userId === userId;
	};

	const filtredItems = useMemo(() => items.filter(filterItems).sort(sortItems), [items, userId]);

	if(items.length === 0) {
		return <p>Добавьте своё воспоминание</p>;
	}

	return <>
		{filtredItems.map(element => {
			return (
				<CardButton key={element.id} onClick={() => {setRecord(element);}}>
					<JournalItem 
						title={element.title}
						text={element.text}
						date={element.date}
					/>
				</CardButton>
			);
		})}
	</>; 
}

export default JournalList;