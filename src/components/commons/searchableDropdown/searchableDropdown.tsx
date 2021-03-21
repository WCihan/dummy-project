import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import countriesEn from '../../../locales/en/countries.json';
import countriesTr from '../../../locales/tr/countries.json';
import './searchableDropdown.css';

export interface ICountry {
	code: string;
	name: string;
}

export interface ISearchableCountry {
	parentClass?: string;
	country: string;
	setCountry: React.Dispatch<React.SetStateAction<string>>;
	required?: boolean;
}

export default function SearchableDropdown({ parentClass, country, setCountry, required }: ISearchableCountry) {
	const { t, i18n } = useTranslation();
	const countries = i18n.language === 'tr' ? countriesTr : countriesEn;
	const [filteredCountries, setFilteredCountries] = useState(countries);
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef && containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside, false);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside, false);
		};
	}, []);

	useEffect(() => {
		setFilteredCountries(
			searchValue
				? countries.filter(
						({ code, name }) =>
							code.toLowerCase().includes(searchValue.toLowerCase()) ||
							name.toLowerCase().includes(searchValue.toLowerCase())
				  )
				: countries
		);
	}, [countries, searchValue]);

	function onSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		!isOpen && setIsOpen(true);
		setSearchValue(value);
		!value && setCountry('');
	}

	function onClickSelect(countryItem: ICountry) {
		setCountry(countryItem.code);
		setSearchValue(countryItem.name);
		setIsOpen(false);
	}

	function onKeySelect(e: React.KeyboardEvent<HTMLElement>) {
		if (e.key && e.key === 'Enter') {
			if (filteredCountries.length === 1) {
				setCountry(filteredCountries[0].code);
				setSearchValue(filteredCountries[0].name);
				setIsOpen(false);
			} else if (filteredCountries.length === 0) {
				setSearchValue('');
			}
		}
	}

	return (
		<div className={`search-country${parentClass ? ` ${parentClass}` : ''}`} ref={containerRef}>
			<input
				className='country__search'
				type='search'
				value={searchValue}
				onChange={onSearch}
				onKeyDown={onKeySelect}
				onMouseDown={() => setIsOpen(true)}
				placeholder={t('dropdown.countryPlaceholder')}
				required={required}
			/>
			<ul className={`country__menu${isOpen ? ' country__menu---open' : ''}`}>
				{filteredCountries.length ? (
					filteredCountries.map((c) => (
						<li
							role='button'
							className={`country__menu__item${
								c.code === country ? ' country__menu__item--selected' : ''
							}`}
							key={c.code}
							tabIndex={0}
							onKeyDown={onKeySelect}
							onClick={() => onClickSelect(c)}
						>
							{c.name}
						</li>
					))
				) : (
					<li className='country__menu__item--not-found'>{t('dropdown.notfound')}</li>
				)}
			</ul>
		</div>
	);
}
