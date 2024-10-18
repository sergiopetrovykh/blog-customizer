// Импорт необходимых компонентов и стилей
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Select } from '../select';
import { Text } from '../text';
import { Separator } from '../separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
// Определение типа пропсов, которые принимает компонент ArticleParamsForm
type PropsArticleParamsForm = {
	onSubmit?: (params: ArticleStateType) => void; // Функция, вызываемая при отправке формы
	onReset?: (params: ArticleStateType) => void; // Функция, вызываемая при сбросе формы
	onToggle?: (isOpen: boolean) => void; // Функция, вызываемая для открытия/закрытия формы
	formOpen: boolean; // Флаг, указывающий, открыта ли форма
};

// Основной компонент, который предоставляет форму для изменения параметров статьи
export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { onSubmit, onReset, onToggle, formOpen } = props;

	// Хук useState для управления состоянием параметров статьи
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);

	// Хук useEffect для добавления и удаления обработчика нажатия клавиши "Escape"
	useEffect(() => {
		// Функция закрытия формы когда я нажимаю на кнопку "Escape"
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && formOpen) {
				onToggle?.(false);
			}
		};

		// Добавил обработчик события при монтировании компонента
		document.addEventListener('keydown', handleKeyDown);
		// Убираю обработчик события при размонтировании компонента
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [formOpen]);

	// Функция для переключения состояния формы (открыта/закрыта)
	const toggleForm = () => {
		onToggle?.(!formOpen);
	};

	// Функции для изменения различных параметров состояния
	const handleFontFamilyChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontFamilyOption: option }));
		// Обновляю шрифт, выбрав новый из переданного параметра
	};

	const handleFontSizeChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontSizeOption: option }));
		// Обновляю размер шрифта
	};

	const handleFontColorChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontColor: option }));
		// Обновляю цвет шрифта
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, backgroundColor: option }));
		// Обновляю фон цвет
	};

	const handleContentWidthChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, contentWidth: option }));
		// Обновляю ширину контента
	};

	// Функция для сброса параметров к значениям по умолчанию (нажатие на "Сбросить")
	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(params);
	};

	//Вызываю функцию при отправке формы (нажатие на "Применить")
	const resetStyles = () => {
		setParams(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	// Определение классов для отображения формы (открытая или закрытая)
	const sidebarStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: formOpen,
	});

	// Возвращаем JSX для отображения компонента
	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={toggleForm} />
			<aside className={sidebarStyle}>
				<form
					className={styles.form}
					onSubmit={submitParams}
					onReset={resetStyles}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={handleFontFamilyChange}
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<RadioGroup
							name={params.fontSizeOption.className}
							options={fontSizeOptions}
							selected={params.fontSizeOption}
							onChange={handleFontSizeChange}
							title={'Размер шрифта'}
						/>
						<Select
							onChange={handleFontColorChange}
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={handleBackgroundColorChange}
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={handleContentWidthChange}
							selected={params.contentWidth}
							placeholder={params.contentWidth.title}
							title='Ширина контента'
							options={contentWidthArr}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
