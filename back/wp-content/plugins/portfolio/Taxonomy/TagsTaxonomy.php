<?php

namespace portfolio\Taxonomy;

use portfolio\PostType\NewsPostType;

class TagsTaxonomy extends Taxonomy {

    const TAXONOMY_KEY = 'tags';
    const TAXONOMY_NAME = 'Tags';
    const POST_TYPE_KEY = NewsPostType::POST_TYPE_KEY;
    const CAPABILITIES =  [
        'manage_terms' => 'manage_tags',
        'edit_terms' => 'edit_tags',
        'delete_terms' => 'delete_tags',
        'assign_terms' => 'assign_tags'
    ];

    const DEFAULT_ROLES_CAPS =  [
        'administrator' => [
            'manage_tags' => true,
            'edit_tags' => true,
            'delete_tags' => true,
            'assign_tags' => true,
        ],
    ];
}