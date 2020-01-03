import './style.editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import edit from './edit';
import save from './save'

const attributes = {
    text: {
        type: 'string',
        source: 'html',
        selector: 'a',
        default: ''
    },
    url: {
        type: 'string',
        selector: 'a',
        source: 'attribute',
        attribute: 'href',
        default: ''
    },
    target: {
        type: 'boolean',
        default: false
    },
    buttonClass: {
        type: '',
        selector: 'a',
        source: 'attribute',
        attribute: 'class' 
    }
}

registerBlockType('tw-blocks/button', {
    title: __( 'TW Button', 'tw-blocks' ),
    category: 'tw-blocks-category',
    description: __( 'Block for buttons', 'tw-blocks' ),
    keywords: [__( 'button', 'tw-blocks' ), __( 'link', 'tw-blocks' )],
    attributes,
    edit,
    save
})