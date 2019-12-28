import './style.editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const attributes = {
    text: {
        type: 'string',
        source: 'html',
        selector: '.tw-heading'
    },
    heading: {
        type: 'string',
        default: 'h3'
    }
}

registerBlockType('tw-blocks/title', {
    title: __( 'TW Title', 'tw-blocks' ),
    category: 'tw-blocks-category',
    description: __('Blocks for titles and heading', 'tw-blocks'),
    keywords: [__( 'title', 'tw-blocks' ), __( 'heading', 'tw-blocks' ), __( 'text', 'tw-blocks' )],
    attributes,
    edit,
    save
})