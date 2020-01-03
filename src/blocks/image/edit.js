import { Component } from '@wordpress/element';
import { MediaPlaceholder, InspectorControls, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/editor';
import { ToggleControl, SelectControl, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

class Edit extends Component {

    onSelectImage = ({ url, id, alt }) => {
        this.props.setAttributes({
            url,
            alt,
            id
        })
    }

    onSelectImageURL = (url) => {
        this.props.setAttributes({
            url,
            alt: '',
            id: null
        })
    }

    getImageSizes = () => {
        //The for...in statement iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols), including inherited enumerable properties.
        const { image, imageSizes } = this.props;
        if(!image) return [];
        let options = [];
        const sizes = image.media_details.sizes;
        for(const key in sizes) {
            const size = sizes[key];
            const imageSize = imageSizes.find(size=>size.slug=== key);
            if(imageSize){
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                })
            }
        }
        return options;
    }
    onChangeImageSize = ( url ) => {
        this.props.setAttributes({ url })
    }
    onChangeheight = (height) => {
        this.props.setAttributes({ height })
    }

    render(){
        const { attributes } = this.props;
        const { url, alt, id, imgFull, height } = attributes;
        const heightOptions = [
            {
                label: '200',
                value: 'img-h-200'
            },
            {
                label: '300',
                value: 'img-h-300'
            },
            {
                label: '400',
                value: 'img-h-400'
            },
            {
                label: '500',
                value: 'img-h-500'
            },
            {
                label: '600',
                value: 'img-h-600'
            },
            {
                label: '700',
                value: 'img-h-700'
            }
        ]
        const fullImageClass= imgFull ? 'img-100' : null;
        const heightClass=height ? height : null;

        console.log(imgFull)
        return(
            <>
                <InspectorControls>
                    <PanelBody>
                        {id &&
                            <>
                                <SelectControl
                                    label={ __( 'Image Size', 'tw-blocks' ) }
                                    options={this.getImageSizes() }
                                    onChange={this.onChangeImageSize}
                                    value= { url }
                                />
                                <SelectControl
                                    label={ __( 'Height for Desktop', 'tw-blocks' ) }
                                    options={heightOptions}
                                    onChange={this.onChangeheight}
                                    value= { height }
                                />
                                <ToggleControl 
                                    label={ __( '100% Wide Image', 'tw-blocks' ) }
                                    checked={imgFull}
                                    onChange={ () => {this.props.setAttributes({ imgFull: !imgFull })} }
                                />
                            </>
                        }
                    </PanelBody>
                </InspectorControls>
                {url ?
                    <div className={`tw-image ${fullImageClass} ${heightClass}`}>
                        <img src={ url } alt={alt} />
                    </div>
                    : <MediaPlaceholder 
                        icon="format-image"
                        allowedTypes={['image']}
                        onSelect = {this.onSelectImage}
                        onSelectURL={this.onSelectImageURL}
                    />
                }
            </>
        )
    }
}

export default withSelect((select, props) => { // select here is destructured from wp.data.select
    const id = props.attributes.id;
    return {
        image: id ? select('core').getMedia(id) : null,
        imageSizes: select('core/editor').getEditorSettings().imageSizes
    }
})(Edit);