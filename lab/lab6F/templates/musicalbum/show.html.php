<?php

/** @var \App\Model\MusicAlbum $musicalbum */
/** @var \App\Service\Router $router */

$title = "{$musicalbum->getSubject()} ({$musicalbum->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $musicalbum->getSubject() ?></h1>
    <article>
        <?= $musicalbum->getContent();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('musicalbum-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('musicalbum-edit', ['id'=> $musicalbum->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';