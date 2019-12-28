import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText, getColorClassName } from '@wordpress/editor';
import classnames from 'classnames';

class Save extends Component {
    render(){

        const { attributes } = this.props;
        const { text } = attributes; 
        
    
        return(
            <>
                <RichText.Content 
                    tagName='p'
                    value = {text}
                />
            </>
        )
    }
}

export default Save;