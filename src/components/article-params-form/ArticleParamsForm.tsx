// Импорт необходимых компонентов и стилей
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
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
import { useClose } from 'src/hooks/useClose'; // Импорт кастомного хука для закрытия формы

type PropsArticleParamsForm = {
	onSubmit: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: PropsArticleParamsForm) => {
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);
	const [formOpen, setFormOpen] = useState(false); // Управление открытием формы
	const formRef = useRef<HTMLFormElement>(null);

	useClose({
		isOpen: formOpen,
		onClose: () => setFormOpen(false), // Закрываем форму при клике вне или по ESC
		rootRef: formRef,
	});

	// Функция для переключения состояния формы (открыта/закрыта)
	const toggleForm = () => {
		setFormOpen(!formOpen);
	};

	// Обработчик отправки формы
	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(params); // Отправляем параметры в родительский компонент
	};

	// Обработчик сброса стилей
	const resetStyles = () => {
		setParams(defaultArticleState);
		onSubmit(defaultArticleState); // Сбрасываем стили в родительском компоненте
	};

	// Функции для изменения различных параметров состояния
	const handleFontFamilyChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontFamilyOption: option })); // Шрифт
	};

	const handleFontSizeChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontSizeOption: option })); // Размер шрифта
	};

	const handleFontColorChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, fontColor: option })); // Цвет шрифта
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, backgroundColor: option })); // Цвет фона
	};

	const handleContentWidthChange = (option: OptionType) => {
		setParams((prev) => ({ ...prev, contentWidth: option }));
	};

	// Определяем классы для бокового меню
	const sidebarStyle = clsx({
		[styles.container]: true, // Основной класс
		[styles.container_open]: formOpen, // Добавляем класс для открытой формы
	});

	// Возвращаем JSX для отображения компонентов в DOM
	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={toggleForm} />
			<aside className={sidebarStyle}>
				{/* Боковая панель с формой */}
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={submitParams}
					onReset={resetStyles}>
					<Text size={31} weight={800} uppercase as='h2'>
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
