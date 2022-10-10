<?php

namespace portfolio\Taxonomy;

class Taxonomy
{
    /**
     * Registers a new taxonomy
     *
     * @return void
     */
    static public function register()
    {
        register_taxonomy(
            static::TAXONOMY_KEY, // on choisit l'identifiant de notre taxo
            [static::POST_TYPE_KEY], // on choisit la liste des CPT auxquels attacher notre taxo
            [
                'hierarchical' => true, // on laisse true pour des questions d'UI dans le backoffice
                'labels' => ['name' =>  static::TAXONOMY_NAME],
                'show_ui' => true,
                'capabilities' => static::CAPABILITIES,
                'show_in_rest' => true,
                'rest_base' => 'tag'
            ],
        );
    }

    /**
     * Automatically attach current CT custom caps to default roles
     *
     * @return void
     */
    static public function addCaps()
    {
        // pour chaque rôle défini dans la liste des rôles custom pour le CT courant
        foreach (static::DEFAULT_ROLES_CAPS as $roleSlug => $capsArray) {
            // on utilise la fonction get_role pour récupérer le role courant
            $currentRole = get_role($roleSlug);

            // pour chaque capability custom dans ce CPT, on l'ajoute au role courant
            foreach ($capsArray as $cap => $grant) {
                // on peut associer une cap à un role avec WP_Role::add_cap()
                $currentRole->add_cap($cap, $grant);
            }
        }
    }

    /**
     * Automatically detach current CT custom caps from default roles
     *
     * @return void
     */
    static public function removeCaps()
    {
        // pour chaque rôle défini dans la liste des rôles custom pour le CT courant
        foreach (static::DEFAULT_ROLES_CAPS as $roleSlug => $capsArray) {
            // on utilise la fonction get_role pour récupérer le role courant
            $currentRole = get_role($roleSlug);

            // pour chaque capability custom dans ce CPT, on la retire du role courant
            foreach ($capsArray as $cap) {
                // on peut associer une cap à un role avec WP_Role::add_cap()
                $currentRole->remove_cap($cap);
            }
        }
    }
}
