"use client";
import { useEffect, useState } from "react";
import styles from "./ArticleList.module.css";

const PAGE_SIZE = 3;
export default function ArticleList() {
	const [posts, setPosts] = useState([]);
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const [hiddenIds, setHiddenIds] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://dummyjson.com/posts")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.posts);
				setLoading(false);
			});
	}, []);

	const handleHide = (id) => {
		setHiddenIds([...hiddenIds, id]);
	};

	const handleLoadMore = () => {
		setVisibleCount(visibleCount + PAGE_SIZE);
	};

	const visiblePosts = posts
		.filter((post) => !hiddenIds.includes(post.id))
		.slice(0, visibleCount);

	if (loading)
		return <div className={styles.articlesLoading}>Loading articles...</div>;

	return (
		<section className={styles.articlesContainer}>
			<h2>Latest News</h2>
			{/** The "&&" works similar to an if statement. Only renders the div if visibleCount.length is 0 */}
			{visibleCount.length === 0 && <div>No more articles to show</div>}

			{visiblePosts.map((post) => (
				<div className={styles.articleCard} key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
					<button
						className={styles.hideBtn}
						onClick={() => handleHide(post.id)}
					>
						Hide{" "}
					</button>
				</div>
			))}
			{visibleCount <
				posts.filter((post) => !hiddenIds.includes(post.id)).length && (
				<button className={styles.loadMoreBtn} onClick={handleLoadMore}>
					Load More
				</button>
			)}
		</section>
	);
}
