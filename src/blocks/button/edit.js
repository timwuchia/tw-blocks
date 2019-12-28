import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {  InspectorControls, RichText, URLInput } from '@wordpress/editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

class Edit extends Component {

    onChangeText = (text) => {
        this.props.setAttributes({ text })
    }

    onChangeURL = (url) => {
        this.props.setAttributes({ url })
    }
    onChangeTarget = (target) => {
        this.props.setAttributes({ target: !target })
    }

    render(){
        const { attributes } = this.props;
        const { text, url, target } = attributes;
        console.log(target)
        return(
            <>
                <InspectorControls>
                    <PanelBody>
                        <ToggleControl 
                            label={__('Open In New Tab', 'tw-blocks')}
                            checked={target}
                            onChange={ () => {this.props.setAttributes({ target: !target })} }
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName='a'
                    value={ text }
                    href={ url }
                    target={ target===true ? '_blank' : '_self' }
                    rel={ target===true ? 'noopener noreferrer' : '' }
                    onChange={this.onChangeText}
                />
                <URLInput 
                    label={__('URL', 'tw-blocks')}
                    value={url}
                    onChange={this.onChangeURL}
                /> 
            </>
        )
    }
}

export default Edit;