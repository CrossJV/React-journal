export const INITIAL_STATE = {
	isValid: {
		text: true,
		title: true,
		date: true
	},
	values : {
		text: '',
		title: '',
		date: '',
		tag: '',
		userId: '',
		id: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch(action.type)
	{
	case 'CLEAR':
		return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false }; 
	case 'RESET_VALIDITY':
		return { ...state, isValid: INITIAL_STATE.isValid };
	case 'SUBMIT': {
		const titleValidity = state.values.title?.trim().length;
		const dateValidity = state.values.date;
		const textValidity = state.values.text?.trim().length;

		return {
			...state,
			isValid: {
				text: textValidity,
				title: titleValidity,
				date: dateValidity,
				userId: state.values.userId,
				id: state.values.id
			},
			isFormReadyToSubmit: titleValidity && dateValidity && textValidity
		};
	}
	case 'SET_VALUE':
		return { ...state, values: {...state.values, ...action.payload} }; 
	
	}
	
}