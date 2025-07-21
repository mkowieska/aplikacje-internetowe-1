<?php
/** @var $musicalbum ?\App\Model\MusicAlbum */
?>

<div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="musicalbum[subject]" value="<?= $musicalbum ? $musicalbum->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="musicalbum[content]"><?= $musicalbum? $musicalbum->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>