import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, PanelColorSettings, BlockControls, AlignmentToolbar } from '@wordpress/editor';
import { PanelBody } from '@wordpress/components';
import { withSpacingControl } from '../../hoc/spacing-controls'

class Edit extends Component {

    onChangeText = (text) => {
        this.props.setAttributes({ text })
    }

    render(){

        const { attributes } = this.props;
        const { text } = attributes;

        return(
            <>
                <BlockControls>
                    <AlignmentToolbar

                    />
                </BlockControls>
                <RichText
                    tagName='p'
                    onChange = { this.onChangeText }
                    value={text}
                />
            </>
        )
    }
}

export default Edit;