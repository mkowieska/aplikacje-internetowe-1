<?php

/** @var \App\Model\MusicAlbum $musicalbum */
/** @var \App\Service\Router $router */

$title = "Edit MusicAlbum {$musicalbum->getSubject()} ({$musicalbum->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('musicalbum-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="musicalbum-edit">
        <input type="hidden" name="id" value="<?= $musicalbum->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('musicalbum-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('musicalbum-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="musicalbum-delete">
                <input type="hidden" name="id" value="<?= $musicalbum->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';