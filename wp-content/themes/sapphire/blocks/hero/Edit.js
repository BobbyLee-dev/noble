import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
	MediaUploadCheck,
	InnerBlocks,
} from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps({
		className: 'hero-block',
	});

	function onFileSelect(imgObj) {
		setAttributes({ imageURL: imgObj.sizes.full.url });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background" initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={attributes.imageID}
								render={({ open }) => {
									return (
										<Button onClick={open}>
											Choose Image
										</Button>
									);
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<section
				{...blockProps}
				style={{
					backgroundImage: `url('${attributes.imageURL}')`,
				}}
			>
				<div class="block-content-wrap">
					<InnerBlocks
						allowedBlocks={[
							'sapphiretheme/sapphire-button',
							'core/paragraph',
							'sapphiretheme/sapphire-heading',
						]}
					/>
				</div>
			</section>
		</>
	);
};

export default Edit;
