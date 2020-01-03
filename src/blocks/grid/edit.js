import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/editor';
import { PanelBody, RangeControl } from '@wordpress/components';

class Edit extends Component {
    render(){
        const { attributes, className } = this.props;
        const { columns, tabletColumns, desktopColumns } = attributes;
        return(
            <div className={`${ className } tw-grid has-${columns}-columns tablet-has-${tabletColumns}-columns desktop-has-${desktopColumns}-columns`}>
                <InspectorControls>
                    <PanelBody>
                        <RangeControl 
                            label={ __( 'Columns', 'tw-blocks' ) }
                            value={ columns }
                            onChange={ (columns) => this.props.setAttributes({ columns }) }
                            min={ 1 }
                            max={ 6 }
                        />
                        <RangeControl 
                            label={ __( 'Tablet Columns', 'tw-blocks' ) }
                            value={ tabletColumns }
                            onChange={ (tabletColumns) => this.props.setAttributes({ tabletColumns }) }
                            min={ 1 }
                            max={ 6 }
                        />
                        <RangeControl 
                            label={ __( 'Desktop Columns', 'tw-blocks' ) }
                            value={ desktopColumns }
                            onChange={ (desktopColumns) => this.props.setAttributes({ desktopColumns }) }
                            min={ 0 }
                            max={ 12 }
                        />
                    </PanelBody>
                </InspectorControls>
                <InnerBlocks 
                    allowedBlocks={ [
                        'tw-blocks/flexible-content',
                        'tw-blocks/title',
                    ] }
                />
            </div>
            
        )
    }
}

export default Edit;