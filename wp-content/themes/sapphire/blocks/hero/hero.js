import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './Edit';

registerBlockType('sapphiretheme/hero', {
	title: 'Sapphire Hero',
	attributes: {
		image: {
			type: 'string',
			default: '',
		},
		imageID: {
			type: 'number',
		},
		imageURL: {
			type: 'string',
		},
	},
	getEditWrapperProps() {
		return {
			'data-align': 'full',
		};
	},
	edit: Edit,
	save: SaveComponent,
});

function SaveComponent() {
	return <InnerBlocks.Content />;
}
