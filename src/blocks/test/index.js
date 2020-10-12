import { registerBlockType } from '@wordpress/blocks';
import {__} from "@wordpress/i18n";

registerBlockType("tw-blocks/test", {
    title: __("Test Block", 'tw-blocks'),
    description: __("Blocks to test HOCS", "tw-blocks"),
    category: 'tw-blocks-category',
    edit: (props) => {
        console.log(props.attributes)
        return (<div>Test</div>);
    },
    save: (props) => {
        return (<div>Test</div>);
    }
})