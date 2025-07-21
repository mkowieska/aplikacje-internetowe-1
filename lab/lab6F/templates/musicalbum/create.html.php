<?php

/** @var \App\Model\MusicAlbum $musicalbum */
/** @var \App\Service\Router $router */

$title = 'Create MusicAlbum';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create MusicAlbum</h1>
    <form action="<?= $router->generatePath('musicalbum-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="musicalbum-create">
    </form>

    <a href="<?= $router->generatePath('musicalbum-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';