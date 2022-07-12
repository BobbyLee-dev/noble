import { registerBlockType } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { RichText, BlockControls } from '@wordpress/block-editor';

registerBlockType('sapphiretheme/sapphire-heading', {
	title: 'Sapphire Heading',
	attributes: {
		text: {
			type: 'string',
		},
		size: {
			type: 'string',
			default: 'h1',
		},
	},
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent(props) {
	function handleTextChange(textValue) {
		props.setAttributes({ text: textValue });
	}
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={props.attributes.size === 'h1'}
						onClick={() => props.setAttributes({ size: 'h1' })}
					>
						Large h1
					</ToolbarButton>
					<ToolbarButton
						isPressed={props.attributes.size === 'h2'}
						onClick={() => props.setAttributes({ size: 'h2' })}
					>
						Medium h2
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				allowedFormats={['core/bold', 'core/italic']}
				tagName={props.attributes.size}
				className={`block-heading ${props.attributes.size}`}
				value={props.attributes.text}
				onChange={handleTextChange}
			/>
		</>
	);
}

function SaveComponent(props) {
	function getTagName() {
		switch (props.attributes.size) {
			case 'h1':
				return 'h1';
			case 'h2':
				return 'h2';
			case 'h3':
				return 'h3';
		}
	}
	return (
		<RichText.Content
			value={props.attributes.text}
			className={`headline headline--${props.attributes.size}`}
			tagName={getTagName()}
		/>
	);
}
