<?php
/**
 * Plugin Name: TW Gutenberg Blocks
 * Plugin URI: 
 * Description: Gutenberg Blocks
 * Author: Tim
 * Author URI:
 */

 if( ! defined( 'ABSPATH' ) ){
     exit;
 }

//  include_once('/src/metabox.php');

 function tw_blocks_categories( $categories, $post ){
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'tw-blocks-category',
                'title' => __('TW Blocks Category', 'tw-blocks'),
                'icon' => 'wordpress'
            )
        )
    );
 }

 add_filter('block_categories', 'tw_blocks_categories', 10, 2);

 function tw_blocks_register_block_type($block, $options = array()) {
    register_block_type(
        'tw-blocks/' . $block,
        array_merge(
            array(
                'editor_script' => 'tw-blocks-editor-script', // this is so that the script is enqueued in the editor page
                'editor_style' => 'tw-blocks-editor-style', // this is so that the style is enqueued in the editors page
                'script' => 'tw-blocks-script',
                'style' => 'tw-blocks-style'
            ),
            $options
        )
    );
 }

 function tw_blocks_enqueue_assets() {
     wp_enqueue_script(
        'tw-blocks-editor-js',
        plugins_url('dist/editor_script.js', __FILE__),
        array('wp-data')
     );
 }

 add_action('enqueue_block_editor_assets', 'tw_blocks_enqueue_assets', $priority, $accepted_args);

 //add action($name, $function_to_add, $priority, $accepted_args)

 function tw_blocks_register() {

    wp_register_script(
        'tw-blocks-editor-script',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'lodash', 'wp-blob', 'wp-data','wp-html-entities', 'wp-compose', 'wp-hooks')
    );

    wp_register_script(
        'tw-blocks-script',
        plugins_url('dist/script.js', __FILE__),
        array('jquery')
    );
    
    wp_register_style(
        'tw-blocks-editor-style',
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')
    );

    wp_register_style(
        'tw-blocks-style',
        plugins_url('dist/style.css', __FILE__)
    );

    tw_blocks_register_block_type('text');
    tw_blocks_register_block_type('button');
    tw_blocks_register_block_type('title');
    tw_blocks_register_block_type('flexible-content');

 };

 add_action('init', 'tw_blocks_register');

//  function tw_blocks_render_latest_posts_block( $attributes ){
//      $args = array(
//          'posts_per_page' => $attributes['numberOfPosts']
//      );
//      if($attributes['postCategories']){
//         $args['cat'] = $attributes['postCategories'];
//      }
//      $query = new WP_Query( $args );
//      $posts = '';

//      if($query->have_posts()){
//         $posts .= '<ul class="wp-blocks-tw-blocks-latest-posts">';
//         while($query->have_posts()){
//             $query->the_post();
//             $posts .= '<li><a href"' . esc_url(get_the_permalink()) . '">' . get_the_title() . '</a></li>';
//         }
//         $posts .= '</ul>';
//         wp_reset_postdata();
//         return $posts;
//      } else {
//          return '<div>' . __("No posts found". "tw-blocks") . '</div>';
//      }
//      return $posts;
//  }

