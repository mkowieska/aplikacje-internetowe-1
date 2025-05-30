<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\MusicAlbum;
use App\Service\Router;
use App\Service\Templating;

class MusicAlbumController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $musicalbums = MusicAlbum::findAll();
        $html = $templating->render('musicalbum/index.html.php', [
            'musicalbums' => $musicalbums,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestMusicAlbum, Templating $templating, Router $router): ?string
    {
        if ($requestMusicAlbum) {
            $musicalbum = MusicAlbum::fromArray($requestMusicAlbum);
            // @todo missing validation
            $musicalbum->save();

            $path = $router->generatePath('musicalbum-index');
            $router->redirect($path);
            return null;
        } else {
            $musicalbum = new MusicAlbum();
        }

        $html = $templating->render('musicalbum/create.html.php', [
            'musicalbum' => $musicalbum,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $musicalbumId, ?array $requestMusicAlbum, Templating $templating, Router $router): ?string
    {
        $musicalbum = MusicAlbum::find($musicalbumId);
        if (! $musicalbum) {
            throw new NotFoundException("Missing musicalbum with id $musicalbumId");
        }

        if ($requestMusicAlbum) {
            $musicalbum->fill($requestMusicAlbum);
            // @todo missing validation
            $musicalbum->save();

            $path = $router->generatePath('musicalbum-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('musicalbum/edit.html.php', [
            '$musicalbum' => $musicalbum,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $musicalbumId, Templating $templating, Router $router): ?string
    {
        $musicalbum = MusicAlbum::find($musicalbumId);
        if (! musicalbum) {
            throw new NotFoundException("Missing musicalbum with id $musicalbumId");
        }

        $html = $templating->render('musicalbum/show.html.php', [
            'musicalbum' => musicalbum,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $musicalbumId, Router $router): ?string
    {
        $musicalbum = MusicAlbum::find($musicalbumId);
        if (! $musicalbum) {
            throw new NotFoundException("Missing musicalbum with id $musicalbumId");
        }

        musicalbum->delete();
        $path = $router->generatePath('musicalbum-index');
        $router->redirect($path);
        return null;
    }
}
