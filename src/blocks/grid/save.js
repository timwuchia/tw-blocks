import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor'

class Save extends Component {
    render(){
        const { attributes } = this.props;
        const { columns, tabletColumns, desktopColumns } = attributes;
        
        return(
             <div className={`tw-grid has-${columns}-columns tablet-has-${tabletColumns}-columns desktop-has-${desktopColumns}-columns`}>
                <InnerBlocks.Content />
            </div>
        )
    }
}

export default Save;