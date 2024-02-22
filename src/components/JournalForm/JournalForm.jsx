import styles from './JournalForm.module.css';
import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JouranlForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalFrom({ onSubmit, record, deleteRecord }) {
	const {0: formState, 1: dispatchFrom} = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true)
		{
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;

		}
	};

	useEffect(() => {
		if(!record)
		{
			dispatchFrom({ type: 'CLEAR' });
			dispatchFrom({ type: 'SET_VALUE', payload: { userId } });
		} else {
			const [dateFormat] = record.date.toISOString().split('T');
			dispatchFrom({ type: 'SET_VALUE', payload: { ...record, date: dateFormat }});
		}	
	}, [record]);

	useEffect(() => {
		let timerId;
		if(!isValid.date || !isValid.text || !isValid.title)
		{
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchFrom({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if(isFormReadyToSubmit)
		{
			onSubmit(values);
			dispatchFrom({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit]);

	useEffect(() => {
		dispatchFrom({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const addJournalItem = (evt) => {
		evt.preventDefault();
		dispatchFrom({ type: 'SUBMIT' });
	};

	const change = (evt) => {
		dispatchFrom({ type: 'SET_VALUE', payload: { [evt.target.name]: evt.target.value} });
	};

	const deleteRecordItem = () => {
		deleteRecord(record.id);
		dispatchFrom({ type: 'CLEAR' });
		dispatchFrom({ type: 'SET_VALUE', payload: { userId } });
	};


	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<Input isValid={isValid.title} ref={titleRef} placeholder='Заголовок' type="text" name='title' value={values.title} onChange={change} appearence={'title'}/>
			<label className={styles['input-wrapper']}><img src="/calendar.svg" alt="calendar" /><span>Дата</span><Input isValid={isValid.date} ref={dateRef} value={values.date} onChange={change} type="date" name='date' /></label>
			<hr />
			<label className={styles['input-wrapper']}><img src="/folder.svg" alt="folder" /><span>Метки</span><Input value={values.tag} onChange={change} type="text" name='tag' /></label>
			<Input value={values.id} type="hidden" name='id' />
			<hr />
			<textarea ref={textRef} value={values.text} onChange={change} name="text" id="" cols="30" rows="10" className={cn(styles['input'], styles['input-text'], {
				[styles['invalid']]: !isValid.text
			})}></textarea>
			<Button text={'Сохранить'} className={'accent'} />
			{record?.id && <Button text={<img src="/trash.svg" alt="trash" className={styles['trash-img']} />} onClick={deleteRecordItem} className={'trash'} />}
		</form>
	);
}

export default JournalFrom;