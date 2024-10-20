// Импорт необходимых компонентов и стилей
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appStyles, setAppStyles] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appStyles.fontFamilyOption.value,
					'--font-size': appStyles.fontSizeOption.value,
					'--font-color': appStyles.fontColor.value,
					'--bg-color': appStyles.backgroundColor.value,
					'--container-width': appStyles.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setAppStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
