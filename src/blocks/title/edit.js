import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls } from '@wordpress/editor';
import { SelectControl, PanelBody } from '@wordpress/components';

class Edit extends Component {

    onChangeText = (text) => {
        this.props.setAttributes({ text });
    }

    render(){
        
        const { attributes } = this.props;
        const { text, heading } = attributes;
        const headingOptions = [
            { label: 'Heading 1', value: 'h1' },
            { label: 'Heading 2', value: 'h2' },
            { label: 'Heading 3', value: 'h3' },
            { label: 'Heading 4', value: 'h4' },
            { label: 'Heading 5', value: 'h5' },
            { label: 'Heading 6', value: 'h6' }
        ]

        return(
            <>
                <InspectorControls>
                    <PanelBody
                        label={__( 'Select Heading Type', 'tw-blocks' )}
                    >
                    <SelectControl
                        label={ __( 'Choose Heading' ) } 
                        value={ heading }
                        options={ headingOptions }
                        onChange = { (heading) => this.props.setAttributes( { heading } ) }
                    />
                    </PanelBody>
                </InspectorControls>
                <RichText 
                    tagName={heading}
                    className='tw-heading'
                    value={text}
                    onChange={this.onChangeText}
                />
            </>
        )
    }
}

export default Edit;