import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {  InspectorControls, RichText, URLInput, BlockControls, AlignmentToolbar } from '@wordpress/editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

class Edit extends Component {

    onChangeText = (text) => {
        this.props.setAttributes({ text: text })
    }

    onChangeURL = (url) => {
        this.props.setAttributes({ url: url })
    }
    onChangeTarget = (target) => {
        this.props.setAttributes({ target: !target })
    }

    render(){
        const { attributes, isSelected } = this.props;
        const { text, url, target, buttonClass } = attributes;
        const btnClass= buttonClass ? `btn btn-${buttonClass}` : null;
        const btnOptions=[
            { 
                label: 'Primary',
                value: 'primary'
             },
             { 
                label: 'Secondary',
                value: 'secondary'
             },
             { 
                label: 'Dark',
                value: 'dark'
             },
             { 
                label: 'Light',
                value: 'light'
             }
        ]
        console.log(attributes);
        return(
            <>
                <InspectorControls>
                    <PanelBody>
                        <ToggleControl 
                            label={__('Open In New Tab', 'tw-blocks')}
                            checked={target}
                            onChange={ () => {this.props.setAttributes({ target: !target })} }
                        />
                        <SelectControl
                            label={__( 'Button Style', 'tw-blocks' )}
                            value={buttonClass}
                            options={btnOptions}
                            onChange={ (btnOption) => { this.props.setAttributes({ buttonClass: btnOption }) }}
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName='a'
                    value={ text }
                    href={ url }
                    className={ btnClass }
                    target={ target===true ? '_blank' : '_self' }
                    onChange={ (text) => {
                        this.onChangeText(text);
                    } }
                />
                {isSelected &&
                    <URLInput 
                        label={__('URL', 'tw-blocks')}
                        value={url}
                        onChange={ (url) => {
                            this.onChangeURL( url );
                        } }
                /> 
                }
            </>
        )
    }
}

export default Edit;