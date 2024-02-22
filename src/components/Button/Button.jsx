import './Button.css';

function Button({ text, className, onClick, ...props }) {
	const cl = 'button ' + className; 

	return (
		<button {...props} onClick={onClick} className={cl}>{text}</button>
	);
}

export default Button;