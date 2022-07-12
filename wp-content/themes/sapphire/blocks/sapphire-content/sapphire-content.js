import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('sapphiretheme/sapphire-content', {
	title: 'Sapphire Content',
	edit: function () {
		const blockProps = useBlockProps({
			className: 'sapphire-content',
		});
		return (
			<section {...blockProps}>
				<InnerBlocks
					allowedBlocks={[
						'sapphiretheme/sapphire-button',
						'core/paragraph',
						'sapphiretheme/sapphire-heading',
					]}
				/>
			</section>
		);
	},
	save: function () {
		return <InnerBlocks.Content />;
	},
});
