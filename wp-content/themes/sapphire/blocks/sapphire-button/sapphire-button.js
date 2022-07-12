import { link } from '@wordpress/icons';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	Button,
} from '@wordpress/components';
import {
	RichText,
	BlockControls,
	__experimentalLinkControl as LinkControl,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';

registerBlockType('sapphiretheme/sapphire-button', {
	title: 'Sapphire Button',
	attributes: {
		text: { type: 'string' },
		type: { type: 'string', default: 'primary' },
		linkObject: { type: 'object', default: { url: '' } },
		colorName: { type: 'string', default: 'blue' },
	},
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent(props) {
	const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

	function handleTextChange(x) {
		props.setAttributes({ text: x });
	}

	function buttonHandler() {
		setIsLinkPickerVisible((prev) => !prev);
	}

	function handleLinkChange(newLink) {
		props.setAttributes({ linkObject: newLink });
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={buttonHandler} icon={link} />
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={props.attributes.type === 'primary'}
						onClick={() => props.setAttributes({ type: 'primary' })}
					>
						Primary
					</ToolbarButton>
					<ToolbarButton
						isPressed={props.attributes.type === 'secondary'}
						onClick={() =>
							props.setAttributes({ type: 'secondary' })
						}
					>
						Secondary
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				allowedFormats={[]}
				tagName="a"
				className={`button ${props.attributes.type} `}
				value={props.attributes.text}
				onChange={handleTextChange}
			/>
			{isLinkPickerVisible && (
				<Popover position="middle center">
					<LinkControl
						settings={[]}
						value={props.attributes.linkObject}
						onChange={handleLinkChange}
					/>
					<Button
						variant="primary"
						onClick={() => setIsLinkPickerVisible(false)}
						style={{ display: 'block', width: '100%' }}
					>
						Confirm Link
					</Button>
				</Popover>
			)}
		</>
	);
}

function SaveComponent(props) {
	return (
		<a
			href={props.attributes.linkObject.url}
			className={`button ${props.attributes.type}`}
		>
			{props.attributes.text}
		</a>
	);
}
