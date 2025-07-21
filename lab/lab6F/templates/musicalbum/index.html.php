<?php

/** @var \App\Model\MusicAlbum[] $musicalbums */
/** @var \App\Service\Router $router */

$title = 'MusicAlbum List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>MusicAlbums List</h1>

    <a href="<?= $router->generatePath('musicalbum-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($musicalbums as $musicalbum): ?>
            <li><h3><?= $musicalbum->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('musicalbum-show', ['id' => $musicalbum->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('musicalbum-edit', ['id' => $musicalbum->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';