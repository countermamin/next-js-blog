import { GetStaticProps } from 'next';
import Head from 'next/head';
import { IArticle, IArticleFields, IHome, IHomeFields } from '../contentful';
import client from '../contentful/index';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
	Container,
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button,
} from 'reactstrap';
import Link from 'next/link';

export default function Home({
	home,
	articles,
}: {
	home: IHome;
	articles: IArticle[];
}) {
	console.log(articles);
	return (
		<div>
			<Head>
				<title>{home.fields.title}</title>
			</Head>

			<main>
				<div
					className='text-center p-5 text-white'
					style={{
						background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
						minHeight: 300,
					}}
				>
					<h1 className='mt-5'>{home.fields.title}</h1>
					<div className='mb-5'>
						{documentToReactComponents(home.fields.description!)}
					</div>
				</div>
				<Container className='pt-5'>
					<Row>
						{articles.map(article => {
							return (
								<Col sm={4} key={article.fields.slug}>
									<Card body>
										<CardTitle tag='h5'>{article.fields.title}</CardTitle>
										<CardText>{article.fields.description}</CardText>
										<Link href={`/articles/${article.fields.slug}`}>
											<Button>{article.fields.action}</Button>
										</Link>
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const home = await client.getEntries<IHomeFields>({
		content_type: 'home',
		limit: 1,
	});

	const articleEntries = await client.getEntries<IArticleFields>({
		content_type: 'article',
		select: 'fields.title,fields.slug,fields.description,fields.action',
	});

	const [homePage] = home.items;

	return {
		props: {
			title: 'Мой блог',
			home: homePage,
			articles: articleEntries.items,
		},
		revalidate: 3600,
	};
};
