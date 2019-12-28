import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';


class Save extends Component {
    render(){

        const { attributes } = this.props;
        const { text, heading } = attributes;

        return(
            <>
                <RichText.Content 
                    tagName={heading}
                    className='tw-heading'
                    value={text}
                />
            </>
        )
    }
}

export default Save;