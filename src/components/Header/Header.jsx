import SelectUser from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

const logo = ['/logo.svg', '/vite.svg'];

function Header() {
	return (
		<>
			<Logo image={logo[0]} />
			<SelectUser />
		</>
		
	);
}

export default Header;