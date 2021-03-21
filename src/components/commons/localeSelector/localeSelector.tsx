import { useTranslation } from 'react-i18next';
import { resources } from '../../../i18n';

const languages = Object.keys(resources);

export default function LocaleSelector() {
	const { i18n } = useTranslation();

	return (
		<select onChange={({ target: { value } }) => i18n.changeLanguage(value)} value={i18n.language}>
			{languages.map((l) => (
				<option value={l} key={l}>
					{l}
				</option>
			))}
		</select>
	);
}
