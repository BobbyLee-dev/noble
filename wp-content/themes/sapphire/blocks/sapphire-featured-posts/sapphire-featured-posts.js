import { RichText } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

wp.blocks.registerBlockType('sapphiretheme/sapphire-featured-posts', {
	title: 'Sapphire Featured Posts',
	attributes: {
		heading: { type: 'string' },
		postType: { type: 'string' },
		postData: {
			type: 'array',
			default: [],
		},
	},
	edit: EditComponent,
	save: function () {
		return null;
	},
});

function EditComponent(props) {
	const { attributes, setAttributes } = props;
	console.log(attributes.postType);
	const [postsMarkup, setPostsMarkup] = useState('');
	useEffect(() => {
		async function go() {
			const response = await apiFetch({
				path: `/featured-posts/v1/get-html?post-type=${attributes.postType}`,
				method: 'GET',
			});
			setPostsMarkup(response);
		}
		go();
	}, [attributes.postType]);

	return (
		<>
			<div className="sapphire-featured-posts">
				<div class="heading-wrap">
					<RichText
						allowedFormats={[]}
						className="block-heading"
						value={attributes.heading}
						onChange={(text) => setAttributes({ heading: text })}
						placeholder="Heading"
						tagName="h2"
					/>
				</div>
				<div>
					<select
						onChange={(e) =>
							setAttributes({ postType: e.target.value })
						}
					>
						<option value="">Select a Post Type</option>
						<option
							value="post"
							selected={attributes.postType == 'post'}
						>
							Post
						</option>
						<option
							value="news"
							selected={attributes.postType == 'news'}
						>
							News
						</option>
					</select>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: postsMarkup }}></div>
		</>
	);
}
