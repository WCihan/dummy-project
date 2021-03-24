import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './searchableDropdown.scss';

export interface IOption {
	key: string;
	label: string;
}

export interface ISearchableCountry {
	selectedItem: string;
	setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
	options: IOption[];
	parentClass?: string;
	required?: boolean;
}

export default function SearchableDropdown({
	selectedItem,
	setSelectedItem,
	options,
	parentClass,
	required
}: ISearchableCountry) {
	const { t } = useTranslation();
	const [filteredOptions, setFilteredOptions] = useState(options);
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
		setFilteredOptions(
			searchValue
				? options.filter(
						({ key, label }) =>
							key.toLowerCase().includes(searchValue.toLowerCase()) ||
							label.toLowerCase().includes(searchValue.toLowerCase())
				  )
				: options
		);
	}, [options, searchValue]);

	function onSearch({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
		!isOpen && setIsOpen(true);
		setSearchValue(value);
		!value && setSelectedItem('');
	}

	function onClickSelect(clickedItem: IOption) {
		setSelectedItem(clickedItem.key);
		setSearchValue(clickedItem.label);
		setIsOpen(false);
	}

	function onKeySelect(e: React.KeyboardEvent<HTMLElement>) {
		if (e.key && e.key === 'Enter') {
			if (filteredOptions.length === 1) {
				setSelectedItem(filteredOptions[0].key);
				setSearchValue(filteredOptions[0].label);
				setIsOpen(false);
			} else if (filteredOptions.length === 0) {
				setSearchValue('');
			}
		}
	}

	return (
		<div className={`search-country${parentClass ? ` ${parentClass}` : ''}`} ref={containerRef}>
			<input
				className='country__item country__search'
				type='search'
				value={searchValue}
				onChange={onSearch}
				onKeyDown={onKeySelect}
				onMouseDown={() => setIsOpen(true)}
				placeholder={t('dropdown.countryPlaceholder')}
				required={required}
			/>
			<ul className={`country__item country__menu${isOpen ? ' country__menu---open' : ''}`}>
				{filteredOptions.length ? (
					filteredOptions.map((opt) => (
						<li
							role='button'
							className={`country__menu__item${
								opt.key === selectedItem ? ' country__menu__item--selected' : ''
							}`}
							key={opt.key}
							tabIndex={0}
							onKeyDown={onKeySelect}
							onClick={() => onClickSelect(opt)}
						>
							{opt.label}
						</li>
					))
				) : (
					<li className='country__menu__item--not-found'>{t('dropdown.notfound')}</li>
				)}
			</ul>
		</div>
	);
}
