import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState, // Начальное состояние параметров статьи
	ArticleStateType, // Тип данных для параметров статьи
} from './constants/articleProps'; // Импорт настроек и типов

import './styles/index.scss'; // Общие стили приложения
import styles from './styles/index.module.scss'; // Модульные стили для компонента App

// Находим элемент с id 'root' в HTML-документе, в который будем рендерить React-приложение
const domNode = document.getElementById('root') as HTMLDivElement;
// Создаем корневой React-компонент, который будет управлять приложением
const root = createRoot(domNode);

// Главный компонент приложения
const App = () => {
	// Используем хук useState для управления состоянием формы с настройками статьи
	const [formState, setFormState] = useState(defaultArticleState); // Состояние для параметров статьи
	const [formOpen, setFormOpen] = useState(false); // Состояние для управления видимостью формы (открыта или закрыта)

	// Функция для переключения видимости формы (открыть/закрыть)
	const toggler = () => setFormOpen(!formOpen);

	// Функция, вызываемая при отправке формы (нажатие на "Применить")
	// Обновляет состояние параметров статьи на основе переданных данных
	const cbSubmit = (props: ArticleStateType) => setFormState(props);

	// Функция, вызываемая при сбросе формы (нажатие на "Сбросить")
	// Устанавливает параметры статьи обратно к значениям по умолчанию
	const cbReset = (props: ArticleStateType) => setFormState(props);

	// Возвращаем JSX разметку компонента
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--bg-color': formState.backgroundColor.value,
					'--container-width': formState.contentWidth.value,
				} as CSSProperties
			}>
			{/* Компонент формы для изменения параметров статьи */}
			<ArticleParamsForm
				onSubmit={cbSubmit} // Отправляю форму
				onReset={cbReset} // Сбрасываю форму
				onToggle={toggler} // Переключаю видимость формы
				formOpen={formOpen} // Передаю текущее состояние видимости формы
			/>
			{/* Компонент самой статьи */}
			<Article onClick={() => setFormOpen(false)} />{' '}
			{/* Закрывает форму при клике по статье */}
		</div>
	);
};

// Рендерим компонент App в корневом элементе DOM с использованием StrictMode
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
