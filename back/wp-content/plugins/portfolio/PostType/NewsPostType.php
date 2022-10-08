<?php

namespace portfolio\PostType;

class NewsPostType extends PostType
{
    // On définit les données propres à ce CPT reliées à class mère
    const POST_TYPE_KEY = 'news';
    const POST_TYPE_LABEL = 'Actualités';
    const POST_TYPE_SLUG = 'actualités';

    const CAPABILITIES = [
        // [cap par défaut, existante dans WP] => [cap custom qui correpond à la même action mais pour ce CPT distinct]
        'edit_posts' => 'edit_news', // on décide du nom de la capability à associer au comportement par défaut "edit_posts"
        'publish_posts' => 'publish_news',
        'edit_post' => 'edit_new',
        'read_post' => 'read_new',
        'delete_post' => 'delete_new',
        'edit_others_posts' => 'edit_others_news',
        'delete_others_posts' =>  'delete_others_news', // la notion "others" s'appuie sur l'auteur du post, il faut donc que ce CPT déclare le support de la feature "author"
        'delete_published_posts' => 'delete_published_news',
    ];

    // la liste des custom caps pour ce CPT que je veux associer à l'administrateur
    const DEFAULT_ROLES_CAPS = [
        'administrator' => [
            'edit_news' => true, 
            'publish_news' => true,
            'edit_new' => true,
            'read_new' => true,
            'delete_new' => true,
            'edit_others_news' => true,
            'delete_others_news' => true,
            'rest_edit_others' => true
        ],
    ];
}