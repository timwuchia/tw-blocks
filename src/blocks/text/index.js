import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.editor.scss';
import edit from './edit';
import save from './save';

const attributes = {
    text: {
        type: 'string',
        source: 'html',
        selector: 'p'
    }
}

registerBlockType('tw-blocks/text', {
    title: __('TW Text Block', 'tw-blocks'),
    description: __('new version of text block', 'tw-blocks'),
    category: 'tw-blocks-category',
    icon: 'dashicon-text-page',
    keywords:[ __('text', 'tw-blocks'), __('text editor', 'tw-blocks') ],
    attributes,
    edit,
    save
})