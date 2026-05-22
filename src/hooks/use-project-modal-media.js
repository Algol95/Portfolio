import { useEffect, useRef, useState } from "react";
import { resolveProjectImagePath, resolveProjectVideoPath } from "@/lib/utils";

function getProjectImages(images) {
  return Array.isArray(images)
    ? images
        .map((image) => resolveProjectImagePath(image))
        .filter((image) => image !== null)
    : [];
}

function getProjectVideos(videos, fallbackPoster) {
  return Array.isArray(videos)
    ? videos
        .map((video, index) => {
          if (typeof video === "string") {
            const resolvedVideo = resolveProjectVideoPath(video);

            if (resolvedVideo === null) {
              return null;
            }

            return {
              src: resolvedVideo,
              key: `video-${index}-${resolvedVideo}`,
              poster: fallbackPoster,
            };
          }

          if (video && typeof video === "object") {
            const resolvedVideo = resolveProjectVideoPath(video.src);

            if (resolvedVideo === null) {
              return null;
            }

            return {
              src: resolvedVideo,
              key: `video-${index}-${resolvedVideo}`,
              poster:
                resolveProjectImagePath(video.poster) ??
                resolveProjectImagePath(video.previewImage) ??
                fallbackPoster,
            };
          }

          return null;
        })
        .filter((video) => video !== null)
    : [];
}

function getProjectMediaItems(project) {
  const images = getProjectImages(project?.images);
  const videos = getProjectVideos(project?.videos, images[0] ?? null);

  return [
    ...images.map((src, index) => ({
      type: "image",
      src,
      key: `image-${index}-${src}`,
    })),
    ...videos.map((video) => ({
      type: "video",
      src: video.src,
      key: video.key,
      poster: video.poster,
    })),
  ];
}

function getPreviousMediaIndex(currentIndex, totalItems) {
  if (totalItems <= 0) {
    return 0;
  }

  return currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
}

function getNextMediaIndex(currentIndex, totalItems) {
  if (totalItems <= 0) {
    return 0;
  }

  return (currentIndex + 1) % totalItems;
}

export function useProjectModalMedia({ open, onClose, project }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isActiveVideoPlaying, setIsActiveVideoPlaying] = useState(false);
  const activeVideoRef = useRef(null);
  const mediaItems = getProjectMediaItems(project);
  const hasMedia = mediaItems.length > 0;
  const hasMultipleMedia = mediaItems.length > 1;
  const safeActiveMediaIndex = hasMedia
    ? Math.min(activeMediaIndex, mediaItems.length - 1)
    : 0;
  const activeMedia = hasMedia ? mediaItems[safeActiveMediaIndex] : null;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && hasMultipleMedia) {
        setIsActiveVideoPlaying(false);
        setActiveMediaIndex((previousIndex) =>
          getPreviousMediaIndex(previousIndex, mediaItems.length),
        );
      }

      if (event.key === "ArrowRight" && hasMultipleMedia) {
        setIsActiveVideoPlaying(false);
        setActiveMediaIndex((previousIndex) =>
          getNextMediaIndex(previousIndex, mediaItems.length),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, hasMultipleMedia, mediaItems.length]);

  const goToMedia = (nextIndex) => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex(nextIndex);
  };

  const toggleActiveVideoPlayback = async () => {
    if (!activeVideoRef.current) {
      return;
    }

    if (activeVideoRef.current.paused) {
      try {
        await activeVideoRef.current.play();
      } catch {
        setIsActiveVideoPlaying(false);
      }

      return;
    }

    activeVideoRef.current.pause();
  };

  const showPreviousMedia = () => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex((previousIndex) =>
      getPreviousMediaIndex(previousIndex, mediaItems.length),
    );
  };

  const showNextMedia = () => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex((previousIndex) =>
      getNextMediaIndex(previousIndex, mediaItems.length),
    );
  };

  return {
    activeMedia,
    activeMediaIndex: safeActiveMediaIndex,
    activeVideoRef,
    hasMultipleMedia,
    isActiveVideoPlaying,
    mediaItems,
    goToMedia,
    setIsActiveVideoPlaying,
    showNextMedia,
    showPreviousMedia,
    toggleActiveVideoPlayback,
  };
}
