import { RichText } from '@wordpress/block-editor';

wp.blocks.registerBlockType('sapphiretheme/sapphire-video-popup', {
	title: 'Sapphire Video Popup',
	attributes: {
		buttonText: { type: 'string' },
		video: { type: 'string' },
	},
	edit: EditComponent,
	save: function () {
		return null;
	},
});

function EditComponent(props) {
	const { attributes, setAttributes } = props;

	return (
		<div className="sapphire-video-popup">
			<div className="add-yt">
				<div className="h3">Add YouTube ID or URL</div>
				<RichText
					allowedFormats={[]}
					className="block-heading"
					value={attributes.video}
					onChange={(text) => setAttributes({ video: text })}
					placeholder="YouTube ID or link"
					tagName="div"
				/>
			</div>

			<RichText
				allowedFormats={[]}
				className="button secondary"
				value={attributes.buttonText}
				onChange={(text) => setAttributes({ buttonText: text })}
				placeholder="Button Text"
				tagName="div"
			/>
		</div>
	);
}
