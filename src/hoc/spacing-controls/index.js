import {__} from "@wordpress/i18n";
import assign from 'lodash.assign';
import {addFilter} from "@wordpress/hooks";
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/editor';
import { PanelBody, SelectControl } from '@wordpress/components';


// Enable spacing controls on the following blocks
const enableSpacingControlOnBlocks = [
    'tw-blocks/text',
    'core/image'
]

// const spacingClasses = {
//     pt: ['pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5'],
//     pb: ['pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5'],
//     pl: ['pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5'],
//     pr: ['pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5'],
//     mt: ['mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5'],
//     mb: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'],
//     ml: ['ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5'],
//     mr: ['mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5']
// }

//Available options
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
    if ( ! enableSpacingControlOnBlocks.includes( name ) ) {
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
        // className: {
        //     pt: '',
        //     pb: '',
        //     pl: '',
        //     pr: '',
        //     mt: '',
        //     mb: '',
        //     ml: '',
        //     mr: '',
        // }
    } );

    return settings;
};


addFilter( 
    'blocks.registerBlockType', 
    'tw-blocks/attribute/spacing', 
    addSpacingControlAttribute 
);

/**
 * Create HOC to add spacing control to inspector controls of block.
 */

export const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        // Do nothing if it's another block than our defined ones.
        if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

        const { paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, className } = props.attributes;

        // generating the classes
        if ( paddingTop ) {
            props.attributes.className.pt = `pt-${ paddingTop }`;
        }
        if ( paddingBottom ) {
            props.attributes.className.pb = `pb-${ paddingBottom }`;
        }
        if ( paddingLeft ) {
            props.attributes.className.pl = `pl-${ paddingLeft }`;
        }
        if ( paddingRight ) {
            props.attributes.className.pr = `pr-${ paddingRight }`;
        }
        if ( marginTop ) {
            props.attributes.className.mt = `mt-${ marginTop }`;
        }
        if ( marginBottom ) {
            props.attributes.className.mb = `mb-${ marginBottom }`;
        }
        if ( marginLeft ) {
            props.attributes.className.ml = `ml-${ marginLeft }`;
        }
        if ( marginRight ) {
            props.attributes.className.mr = `mr-${ marginRight }`;
        }


        return (
            <>
                <BlockEdit { ...props } />
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
                                    paddingTop: selectedSpacingOption,
                                    className: { pt: `pt-${paddingTop}` }
                                } );
                            } }
                        />
                        <SelectControl
                            label={ __( 'Padding Bottom' ) }
                            value={ paddingBottom }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    paddingBottom: selectedSpacingOption,
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
}, 'withSpacingControl' );

addFilter( 
    'editor.BlockEdit', 
    'tw-blocks/with-spacing-control', 
    withSpacingControl 
);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
// const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
//     // Do nothing if it's another block than our defined ones.
//     if ( ! enableSpacingControlOnBlocks.includes( blockType.name ) ) {
//         return saveElementProps;
//     }

//     const margins = {
//         small: '8px',
//         medium: '15px',
//         large: '30px',
//     };

//     if ( attributes.spacing in margins ) {
//         // Use Lodash's assign to gracefully handle if attributes are undefined
//         assign( saveElementProps, { style: { 'margin-bottom': margins[ attributes.spacing ] } } );
//     }

//     return saveElementProps;
// };

// addFilter( 'blocks.getSaveContent.extraProps', 'tw-blocks/get-save-content/extra-props', addSpacingExtraProps );