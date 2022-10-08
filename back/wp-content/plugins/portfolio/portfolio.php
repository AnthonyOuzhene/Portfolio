<?php

namespace portfolio;

/**
 * Plugin Name: portfolio
 */

// on injecte l'autoload de composer
require __DIR__ . '/vendor/autoload.php';

// chemin absolu vers le fichier
const PORTFOLIO_PLUGIN_FILE = __FILE__;

// on démarre le plugin
Plugin::run();