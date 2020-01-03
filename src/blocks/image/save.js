import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class Save extends Component {
    render(){

        const { attributes } = this.props;
        const { url, alt, id, imgFull, height } = attributes;
        const fullImageClass= imgFull ? 'img-100' : '';
        const heightClass=height ? height : null;

        return(
            <div className={`tw-image ${fullImageClass} ${heightClass}`}>
                <img src={ url } alt={ alt } />
            </div>
        )
    }
}

export default Save;