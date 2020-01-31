import {__} from "@wordpress/i18n";
import assign from 'lodash.assign';
import {addFilter} from "@wordpress/hooks";
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, RichText } from '@wordpress/editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';


// Enable style controls on the following blocks
const enableStyleControlOnBlocks = [
    'tw-blocks/text',
    'tw-blocks/title',
    'tw-blocks/image',
    'tw-blocks/flexible-content',
    'tw-blocks/grid',
    'core/columns',
    'core/group'
]

//Available options
const containerControlOptions=[
    { 
        label: __( 'None', 'tw-blocks' ),
        value: '',
    },
    { 
        label: __( 'Container', 'tw-blocks' ),
        value: 'container',
    },
    {
        label: __( 'Container Fluid', 'tw-blocks' ),
        value: 'container-fluid',
    }
];

const backgroundColorOptions=[
    {
        label:__( 'None', 'tw-blocks' ),
        value: null
    },
    {
        label: __( 'Primary', 'tw-blocks' ),
        value: 'bg-primary'
    },
    {
        label: __( 'Secondary', 'tw-blocks' ),
        value: 'bg-secondary'
    },
    {
        label: __( 'Light', 'tw-blocks' ),
        value: 'bg-light'
    },
    {
        label: __( 'Dark', 'tw-blocks' ),
        value: 'bg-dark'
    }
]

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
 * Add style control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addStyleControlAttribute = ( settings, name ) => {
    // Do nothing if it's another block than our defined ones
    if ( ! enableStyleControlOnBlocks.includes( name ) ) {
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
        container: {
            type: 'string',
            default: containerControlOptions[0].value
        },
        backgroundColor: {
            type: 'string',
            default: backgroundColorOptions[0].value
        },
        id: {
            type: 'string',
            default: ''
        }
    } );

    return settings;
};


addFilter( 
    'blocks.registerBlockType', 
    'tw-blocks/attribute/style', 
    addStyleControlAttribute 
);

/**
 * Create HOC to add style control to inspector controls of block.
 */

const withStyleControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        // Do nothing if it's another block than our defined ones.
        if ( ! enableStyleControlOnBlocks.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

        const { paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, container, backgroundColor, id } = props.attributes;
        const spacingClasses = `pt-${ paddingTop } pb-${ paddingBottom } pl-${ paddingLeft } pr-${ paddingRight} mt-${ marginTop } mb-${ marginBottom } ml-${ marginLeft } mr-${ marginRight}`;
        const containerClass=`${container}`;
        const backgroundColorClass=`${backgroundColor}`;
        const parentWrapperClasses=[spacingClasses, backgroundColorClass].join(' ')
        return (
            <>
                <div className={parentWrapperClasses}>
                    <div id={id} className={containerClass}>
                        <BlockEdit { ...props } />
                    </div>
                </div>
                <InspectorControls>
                <PanelBody>
                    <TextControl 
                        label={__('ID')}
                        value={ id }
                        onChange={(id) => {
                            props.setAttributes({
                                id
                            })
                        } }
                    />
                </PanelBody>
                <PanelBody
                        title={ __( 'Background' ) }
                        initialOpen={ true }
                    >
                        <SelectControl 
                            label={ __( 'Background Color' ) }
                            value={ backgroundColor }
                            options={ backgroundColorOptions }
                            onChange={ ( selectedBackgroundColor ) => {
                                props.setAttributes( {
                                    backgroundColor: selectedBackgroundColor
                                } );
                            } }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __( 'Container Control' ) }
                        initialOpen={ true }
                    >
                        <SelectControl 
                            label={ __( 'Container Type' ) }
                            value={ container }
                            options={ containerControlOptions }
                            onChange={ ( selectedContainerOption ) => {
                                props.setAttributes( {
                                    container: selectedContainerOption
                                } );
                            } }
                        />
                    </PanelBody>
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

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */

function saveStyle( element, blockType, attributes  ) {
	if (!element) {
		return;
    }
    const { paddingBottom, paddingLeft, paddingRight, paddingTop, marginBottom, marginLeft, marginRight, marginTop, container, backgroundColor, id } = attributes;
    const spacingClasses = `pt-${ paddingTop } pb-${ paddingBottom } pl-${ paddingLeft } pr-${ paddingRight} mt-${ marginTop } mb-${ marginBottom } ml-${ marginLeft } mr-${ marginRight}`;
    const containerClass = `${container}`;
    const backgroundColorClass=`${backgroundColor}`;
    const parentWrapperClasses=[spacingClasses, backgroundColorClass].join(' ')
	return (
        <div className={ parentWrapperClasses }>
            <div id={id} className={containerClass}>
                { element }
            </div>
        </div>
    );
}

 addFilter( 'blocks.getSaveElement', 'tw-blocks/get-save-content/save-style', saveStyle );