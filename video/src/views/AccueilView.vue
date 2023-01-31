<template>
    <video
      id="video_background"
      preload="auto"
      autoplay
      loop="loop"
      muted="muted"
    >
      <source
        src="http://jsonvideo.jmfino.fr/videoacceuil.mp4"
        type="video/mp4"
      />
    </video>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
