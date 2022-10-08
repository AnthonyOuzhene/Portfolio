<?php

namespace portfolio\Classes;

class Database
{
    /**
     * generateTables
     *
     * Creates the custom mysql tables for portfolio
     * 
     * @return void
     */
    static public function generateTables()
    {
        global $wpdb;

        $tableName = $wpdb->prefix . 'news';
        $tablePost = $wpdb->prefix . 'posts';

        // on récupère le jeu de caractère géré par la base
        $charsetCollate = $wpdb->get_charset_collate();

        // écrire la requête à exécuter
        $sql = "
            CREATE TABLE IF NOT EXISTS `{$tableName}` (
                `news_id` BIGINT(20) UNSIGNED PRIMARY KEY NOT NULL  AUTO_INCREMENT,
                `rating` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
                `post_id` BIGINT(20) UNSIGNED NOT NULL ,
                FOREIGN KEY (`post_id`) REFERENCES " . $tablePost . " (`id`)
            ) {$charsetCollate};
        ";

        // on utlise l'objet wpdb pour faire la requête
        $wpdb->query($sql);
    }
}
