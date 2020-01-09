import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from "@wordpress/editor";

registerBlockType('tw-blocks/flexible-content', {
    title: __('Flexible Content', 'tw-blocks'),
    description: __('Block that allows basic layout', 'tw-blocks'),
    category: 'tw-blocks-category',
    supports: {
        html: false,
        align: ['wide', 'full']
    },
    icon: 'grid-view',

    edit(){

        return(
            <>
                <InnerBlocks 
                    allowedBlocks={ [
                        'tw-blocks/text',
                        'tw-blocks/title',
                        'tw-blocks/button',
                        'core/shortcode'
                    ] }
                />
            </>
        )
    },
    save({ attributes }) {
        
        return (
            <>
                <InnerBlocks.Content />
            </>
        )
    }
})