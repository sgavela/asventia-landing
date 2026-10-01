"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import poster from "@/assets/hero-poster.jpg";

type Connection = { saveData?: boolean };

export function SceneMedia({ playing }: { playing: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const markReady = () => {
      video.dataset.ready = "true";
    };
    video.addEventListener("playing", markReady);

    const saveData = (navigator as Navigator & { connection?: Connection }).connection?.saveData;
    // React doesn't always reflect `muted` as an attribute; autoplay policies need it set.
    video.muted = true;
    if (playing && !saveData) {
      video.play().catch(() => {
        // Autoplay refused (low-power mode etc.): the poster frame stays up.
      });
    } else {
      video.pause();
    }
    return () => video.removeEventListener("playing", markReady);
  }, [playing]);

  return (
    <>
      <Image
        src={poster}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="object-cover object-[60%_50%] lg:object-[50%_50%]"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover object-[60%_50%] opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100 lg:object-[50%_50%]"
      >
        <source src="/media/hero-720.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/media/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/media/hero-1080.webm" type="video/webm" />
        <source src="/media/hero-1080.mp4" type="video/mp4" />
      </video>
    </>
  );
}
