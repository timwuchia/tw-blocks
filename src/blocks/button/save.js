import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {  RichText } from '@wordpress/editor';


class Save extends Component {
    render(){

        const { attributes } = this.props;
        const { text, url, target, buttonClass } = attributes;
        const btnClass= buttonClass ? `btn btn-${buttonClass}` : null;
        console.log(target);

        return(
            <RichText.Content
                tagName='a' 
                href={url}
                className={ btnClass }
                target={ target===true ? '_blank' : '_self' }
                rel={ target===true ? 'noopener noreferrer' : '' }
                value={text}
            />
        )
    }
}

export default Save;