import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalFrom from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items)
{
	if(!items)
	{
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const {0: items, 1: setItems} = useLocalStorage('data');
	const {0: record, 1: setRecord} = useState(null);

	const addRecord = (obj) => {
		if(obj.id) {
			setItems([...mapItems(items).map(i => {
				if(i.id === obj.id) {
					return {
						...obj
					};
				}
				return i;
			})]);
		} else {
			setItems([...mapItems(items), {
				...obj,
				date: new Date(obj.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		}	
	};

	const deleteRecord = (id) => {
		if(id)
		{
			setItems([...items.filter(record => record.id !== Number(id))]);
		}
	};


	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setRecord(null)} />
					<JournalList items={mapItems(items)} setRecord={setRecord} />
				</LeftPanel>
				<Body>
					<JournalFrom onSubmit={addRecord} record={record} deleteRecord={deleteRecord} />
				</Body>
			
			</div>
		</UserContextProvider>
	);
}

export default App;
