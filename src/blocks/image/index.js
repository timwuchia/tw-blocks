import './style.editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import save from './save';
import edit from './edit';

const attributes = {
    url: {
        type: 'string',
        selector: 'img',
        source: 'attribute',
        attribute: 'src',
        default: ''
    },
    alt: {
        type: 'string',
        selector: 'img',
        source: 'attribute',
        attribute: 'alt',
        default: ''
    },
    id: {
        type: 'number',
        default: null
    },
    imgFull: {
        type: 'boolean',
        default: false
    },
    height: {
        type: 'string',
        selector: '.tw-image',
        source: 'attribute',
        attribute: 'class',
        default: ''
    }
}

registerBlockType( 'tw-blocks/image', {
    title: __( 'TW Image', 'tw-blocks' ),
    description: __( 'layout for images', 'tw-blocks' ),
    category: 'tw-blocks-category',
    keywords: [__('image', 'tw-blocks'), __( 'picture', 'tw-blocks' )],
    attributes,
    edit,
    save
} )