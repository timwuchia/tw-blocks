import assign from 'lodash.assign';
import {addFilter} from "@wordpress/hooks";
import { InspectorControls } from '@wordpress/editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
const { __ } = wp.i18n;

// Disable spacing control on the following blocks
const disableSpacingControlOnBlocks = [
    'core/image',
];

// Available spacing control options
const spacingControlOptions = [

    {
        label: __( 'None', 'tw-blocks' ),
        value: 0,
    },
    {
        label: __( 'Extra Small', 'tw-blocks' ),
        value: 1,
    },
    {
        label: __( 'Small', 'tw-blocks' ),
        value: 2,
    },
    {
        label: __( 'Medium', 'tw-blocks' ),
        value: 3,
    },
    {
        label: __( 'Large', 'tw-blocks' ),
        value: 4,
    },
    {
        label: __( 'Extra Large', 'tw-blocks' ),
        value: 5,
    },
];

/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSpacingControlAttribute = ( settings, name ) => {
    // Do nothing if it's another block than our defined ones.
    if ( disableSpacingControlOnBlocks.includes( name ) ) {
        return settings;
    }

    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = assign( settings.attributes, {
        paddingTop: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        paddingBottom: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        paddingLeft: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        paddingRight: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        marginTop: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        marginBottom: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        marginLeft: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        marginRight: {
            type: 'number',
            default: spacingControlOptions[0].value
        },
        
    } );

    return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-example/attribute/spacing', addSpacingControlAttribute );

/**
 * Create HOC to add style control to inspector controls of block.
 */

const withStyleControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        // Do nothing if it's another block than our defined ones.
        if ( disableSpacingControlOnBlocks.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

        const { paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, container, id } = props.attributes;
        const spacingClasses = () => {

            let classes = [];

            if(paddingTop !== null && paddingTop !==0 ){
                classes.push(`pt-${paddingTop}`);
            }

            if(paddingBottom !== null && paddingBottom !==0){
                classes.push(`pb-${paddingBottom}`);
            }

            if(paddingLeft !== null && paddingLeft !==0){
                classes.push(`pl-${paddingLeft}`);
            }

            if(paddingRight !== null &&  paddingRight !==0){
                classes.push(`pr-${paddingRight}`);
            }

            if(marginTop !== null && marginTop !==0 ){
                classes.push(`pt-${marginTop}`);
            }

            if(marginBottom !== null && marginBottom !==0){
                classes.push(`pb-${marginBottom}`);
            }

            if(marginLeft !== null && marginLeft !==0){
                classes.push(`pl-${marginLeft}`);
            }

            if(marginRight !== null &&  marginRight !==0){
                classes.push(`pr-${marginRight}`);
            }


            console.log(classes);
            return classes.join(' ')
        }
        const parentWrapperClasses=[spacingClasses()].join(' ')
        return (
            <>
                <div className={parentWrapperClasses}>
                    <BlockEdit { ...props } />
                </div>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Control Padding' ) }
                        initialOpen={ true }
                    >
                        <SelectControl
                            label={ __( 'Padding Top' ) }
                            value={ paddingTop }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    paddingTop: parseInt( selectedSpacingOption )
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Padding Bottom' ) }
                            value={ paddingBottom }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    paddingBottom: parseInt( selectedSpacingOption )
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Padding Left' ) }
                            value={ paddingLeft }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    paddingLeft: selectedSpacingOption,
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Padding Right' ) }
                            value={ paddingRight }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    paddingRight: selectedSpacingOption,
                                } );
                            } }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __( 'Control Margin' ) }
                        initialOpen={ true }
                    >
                        <SelectControl
                            label={ __( 'Margin Top' ) }
                            value={ marginTop }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    marginTop: selectedSpacingOption,
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Margin Bottom' ) }
                            value={ marginBottom }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    marginBottom: selectedSpacingOption,
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Margin Left' ) }
                            value={ marginLeft }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    marginLeft: selectedSpacingOption,
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Margin Right' ) }
                            value={ marginRight }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    marginRight: selectedSpacingOption,
                                } );
                            } }
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withStyleControl' );

addFilter( 
    'editor.BlockEdit', 
    'tw-blocks/with-style-control', 
    withStyleControl,  
);