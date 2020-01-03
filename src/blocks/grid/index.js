import './style.editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const attributes = {
    columns: {
        type: 'number',
        default: 1
    },
    tabletColumns: {
        type: 'number',
        default: 2
    },
    desktopColumns: {
        type: 'number',
        default: 3
    }
}

registerBlockType('tw-blocks/grid', {
    title: __( 'Grid Layuout', 'tw-blocks' ),
    description: __(' Layout for several columns ', 'tw-blocks' ),
    category: 'tw-blocks-category',
    icon: 'grid-view',
    keywords: [__( 'grid', 'tw-blocks' ), __( 'columns', 'tw-blocks' ), __( 'multi', 'tw-blocks' )],
    attributes,
    edit,
    save
})