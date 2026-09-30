"use client";

import { useEffect, useRef, useState, type TouchEvent, type WheelEvent } from "react";
const BASE_PATH = "/darshan-yashashwini-engagement-invite";

/* =========================================================
   EVENT DATA
========================================================= */

const eventDate = new Date("2026-10-18T10:00:00+05:30");


/* =========================================================
   COUNTDOWN
========================================================= */

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = eventDate.getTime();

      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    calculate();

    const timer = setInterval(calculate, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">

      <div className="countdown-box">
        <strong>
          {String(timeLeft.days).padStart(2, "0")}
        </strong>
        <span>DAYS</span>
      </div>

      <div className="countdown-box">
        <strong>
          {String(timeLeft.hours).padStart(2, "0")}
        </strong>
        <span>HOURS</span>
      </div>

      <div className="countdown-box">
        <strong>
          {String(timeLeft.minutes).padStart(2, "0")}
        </strong>
        <span>MINUTES</span>
      </div>

      <div className="countdown-box">
        <strong>
          {String(timeLeft.seconds).padStart(2, "0")}
        </strong>
        <span>SECONDS</span>
      </div>

    </div>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function Home() {

  const [opened, setOpened] = useState(false);
  const [experienceGateVisible, setExperienceGateVisible] = useState(false);
  const [experienceGateClosing, setExperienceGateClosing] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  /* =======================================================
     MUSIC
  ======================================================= */

  useEffect(() => {
    if (!opened) return;

    const timer = window.setTimeout(() => {
      setExperienceGateVisible(true);
    }, 3400);

    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    if (!experienceGateVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [experienceGateVisible]);

  const releaseExperienceGate = () => {
    if (experienceGateClosing) return;

    setExperienceGateClosing(true);

    window.setTimeout(() => {
      setExperienceGateVisible(false);
      setExperienceGateClosing(false);
    }, 720);
  };

  const handleExperienceWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 8) {
      releaseExperienceGate();
    }
  };

  const handleExperienceTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleExperienceTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const startY = touchStartY.current;
    const currentY = event.touches[0]?.clientY;

    if (startY !== null && currentY !== undefined && startY - currentY > 18) {
      releaseExperienceGate();
      touchStartY.current = null;
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };


  return (

    <main className="invite">


      {/* =================================================
          BACKGROUND MUSIC
      ================================================= */}

      <audio
        ref={audioRef}
        src={`${BASE_PATH}/music/engagement-song.mp3`}
        loop
        preload="auto"
        aria-hidden="true"
      />


      {/* =================================================
          MUSIC BUTTON
      ================================================= */}

      <button
        className={`music-button ${
          musicPlaying ? "playing" : ""
        }`}
        onClick={toggleMusic}
        aria-label="Toggle music"
      >

        <span className="music-icon">
          {musicPlaying ? "♫" : "♪"}
        </span>

        <span>
          {musicPlaying ? "Playing" : "Music"}
        </span>

      </button>


      {/* =================================================
          FULL SCREEN ENVELOPE OPENING
      ================================================= */}

      <section
        className={`opening ${
          opened ? "is-open" : ""
        }`}
      >


        {/* -----------------------------------------------
            AMBIENT BACKGROUND
        ----------------------------------------------- */}

        <div className="opening-background">

          <div className="floating-light light-one" />

          <div className="floating-light light-two" />

          <div className="floating-light light-three" />

        </div>


        {/* -----------------------------------------------
            ENVELOPE SCENE
        ----------------------------------------------- */}

        <div className="envelope-scene">


          {/* =============================================
              INVITATION CARD INSIDE ENVELOPE
          ============================================= */}

          <div className="invitation-card">

            <div className="card-border">

              <p className="card-small">
                WITH HEARTS FULL OF JOY
              </p>

              <p className="card-small">
                AND GRATITUDE
              </p>


              <div className="card-line" />


              <p className="card-welcome">
                WE WARMLY WELCOME YOU TO
              </p>


              <h1>
                The
                <span>Engagement</span>
              </h1>


              <div className="card-names">

                Darshan

                <small>
                  &
                </small>

                Yashashwini

              </div>


              <div className="card-date">
                18 · 10 · 2026
              </div>

            </div>

          </div>


          {/* =============================================
              FULL SCREEN ENVELOPE
          ============================================= */}

          <div className="envelope">


            {/* Envelope back */}
            <div className="envelope-back" />


            {/* Paper inside */}
            <div className="envelope-paper" />


            {/* Left fold */}
            <div className="envelope-left" />


            {/* Right fold */}
            <div className="envelope-right" />


            {/* Front/bottom pocket */}
            <div className="envelope-bottom" />


            {/* Top flap */}
            <div className="envelope-flap">

              <div className="flap-inner" />

            </div>


            {/* Gold seal */}
            <div className="envelope-seal">

              <span>
                ♡
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            OPEN INVITATION
        ================================================= */}

        <div className="opening-instruction">

          <p>
            A BEAUTIFUL MOMENT AWAITS
          </p>


          <button
            className="open-envelope-button"
            onClick={() => setOpened(true)}
          >

            <span>
              Open Invitation
            </span>

            <small>
              ✦
            </small>

          </button>

        </div>

      </section>


      {/* =================================================
          POST-ENVELOPE EXPERIENCE GATE
      ================================================= */}

      {experienceGateVisible && (
        <div
          className={`experience-gate ${
            experienceGateClosing ? "is-closing" : ""
          }`}
          onWheel={handleExperienceWheel}
          onTouchStart={handleExperienceTouchStart}
          onTouchMove={handleExperienceTouchMove}
          role="dialog"
          aria-label="Invitation experience instructions"
        >
          <div className="experience-gate-music-hint">
            ↑ MUSIC • TAP TO PLAY
          </div>

          <div className="experience-gate-inner">
            <span className="experience-gate-line" />

            <p className="experience-gate-kicker">
              YOUR INVITATION AWAITS
            </p>

            <h2>
              Turn on the music
            </h2>

            <p className="experience-gate-subtitle">
              for a better experience
            </p>

            <div className="experience-gate-music">
              ♪
            </div>

            <div className="experience-gate-scroll">
              <span>↓</span>
              <strong>SCROLL DOWN TO BEGIN</strong>
            </div>
          </div>
        </div>
      )}


      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">

        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-petal petal-one">✦</span>
          <span className="hero-petal petal-two">✧</span>
          <span className="hero-petal petal-three">·</span>
          <span className="hero-petal petal-four">✦</span>
        </div>

        <div className="hero-content">


          <p className="section-kicker fade-up">
            WITH HEARTS FULL OF JOY
          </p>


          <div className="gold-line small fade-up delay-1" />


          <div className="couple-names fade-up delay-2">

            <span>
              Darshan
            </span>

            <em>
              &
            </em>

            <span>
              Yashashwini
            </span>

          </div>


          <p className="hero-message fade-up delay-3">

            Together with their families request
            the pleasure of your presence at their
            engagement.

          </p>


          <div className="hero-date fade-up delay-4">

            <span>
              SUNDAY
            </span>

            <strong>
              18
            </strong>

            <span>
              OCTOBER 2026
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section className="section intro-section">

        <div className="floral-mark">
          ✦
        </div>


        <p className="section-kicker">
          A NEW BEGINNING
        </p>


        <h2 className="script-heading">
          Two hearts,
          <br />
          one beautiful moment.
        </h2>


        <div className="gold-line" />


        <p className="body-copy">

          With hearts full of joy and gratitude,
          we warmly welcome you to celebrate
          this beautiful beginning with us.

        </p>

      </section>


      {/* =================================================
          COUPLE PHOTO
      ================================================= */}

      <section className="couple-section">

        <p className="section-kicker">
          TOGETHER, ALWAYS
        </p>


        <div className="couple-frame">

          <div className="couple-placeholder">

            <img
              src={`${BASE_PATH}/couple.jpg`}
              alt="Darshan and Yashashwini"
              className="couple-photo"
            />

            <div className="couple-photo-overlay" />

            <div className="placeholder-content">

              <span className="placeholder-symbol">
                ♡
              </span>

              <p>
                DARSHAN
                <br />
                &
                <br />
                YASHASHWINI
              </p>

              <small>
                OUR STORY BEGINS HERE
              </small>

            </div>

          </div>


          <span className="frame-flower top-left">
            ✿
          </span>

          <span className="frame-flower bottom-right">
            ✿
          </span>

        </div>


        <p className="photo-caption">
          A BEAUTIFUL BEGINNING
        </p>

      </section>


      {/* =================================================
          CELEBRATION
      ================================================= */}

      <section className="section celebration-section">

        <p className="section-kicker">
          JOIN US FOR
        </p>


        <h2 className="script-heading">
          The Engagement
        </h2>


        <div className="gold-line" />


        <div className="event-date-large">

          <span>
            SUNDAY
          </span>

          <strong>
            18
          </strong>

          <span>
            OCTOBER 2026
          </span>

        </div>


        <div className="event-time">

          <div className="event-icon">
            ◷
          </div>


          <div>

            <small>
              TIME
            </small>

            <strong>
              10:00 AM ONWARDS
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          COUNTDOWN
      ================================================= */}

      <section className="countdown-section">


        <div className="countdown-orb orb-one" />

        <div className="countdown-orb orb-two" />

        <div className="countdown-orb orb-three" />


        <div className="countdown-particles">

          <span>✦</span>

          <span>✧</span>

          <span>✦</span>

          <span>·</span>

          <span>✧</span>

          <span>·</span>

        </div>


        <div className="countdown-inner">


          <p className="section-kicker">
            THE MOMENT IS GETTING CLOSER
          </p>


          <h2>
            Counting Down
          </h2>


          <Countdown />


          <p className="countdown-date">

            18 OCTOBER 2026

            <span>
              ·
            </span>

            10:00 AM ONWARDS

          </p>

        </div>

      </section>


      {/* =================================================
          FAMILIES
      ================================================= */}

      <section className="section families-section">

        <p className="section-kicker">
          WITH THE BLESSINGS OF OUR FAMILIES
        </p>


        <h2 className="script-heading">
          Our Families
        </h2>


        <div className="gold-line" />


        <div className="families">


          {/* GROOM */}

          <div className="family">

            <p className="family-label">
              GROOM'S FAMILY
            </p>


            <h3>
              Kamalesh B
              <br />

              <span>
                &
              </span>

              <br />

              Late Mala C
            </h3>


            <div className="family-divider">
              ✦
            </div>


            <p>
              Tejaswini K
              <br />
              Dr. Manjesh A
              <br />
              Pruthvi
              <br />
              Karan K Gowda
            </p>

          </div>


          {/* CENTER */}

          <div className="family-divider-main">

            <span />

            <b>
              ♡
            </b>

            <span />

          </div>


          {/* BRIDE */}

          <div className="family">

            <p className="family-label">
              BRIDE'S FAMILY
            </p>


            <h3>
              V Lokesh Gowda
              <br />

              <span>
                &
              </span>

              <br />

              Yashodha B R
            </h3>


            <div className="family-divider">
              ✦
            </div>


            <p>
              Benak L Gowda
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          VENUE
      ================================================= */}

      <section className="venue-section">


        {/* -----------------------------------------------
            MOVING BACKGROUND
        ----------------------------------------------- */}

        <div className="venue-background">

          <img
            src={`${BASE_PATH}/venue.jpg`}
            alt=""
            className="venue-photo"
            aria-hidden="true"
          />

          <div className="venue-photo-overlay" />


          <div className="venue-glow glow-one" />

          <div className="venue-glow glow-two" />


          <div className="venue-particle particle-one">
            ✦
          </div>

          <div className="venue-particle particle-two">
            ✧
          </div>

          <div className="venue-particle particle-three">
            ·
          </div>

          <div className="venue-particle particle-four">
            ✦
          </div>


          <div className="venue-light-beam" />

        </div>


        {/* -----------------------------------------------
            VENUE CONTENT
        ----------------------------------------------- */}

        <div className="venue-content">


          <p className="section-kicker">
            THE CELEBRATION
          </p>


          <div className="venue-ornament">
            ✦
          </div>


          <h2 className="venue-title">

            TAJ

            <span>
              VIVANTA
            </span>

          </h2>


          <p className="venue-location">

            YESHWANTHPUR

            <br />

            BENGALURU

          </p>


          <div className="gold-line" />


          <p className="venue-description">

            We would be delighted to have you
            join us at this beautiful setting as
            we celebrate this special beginning.

          </p>


          <a
            href="https://www.google.com/maps/search/?api=1&query=Taj+Vivanta+Yeshwanthpur+Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="open-envelope-button"
          >

            VIEW LOCATION

          </a>

        </div>

      </section>


      {/* =================================================
          GALLERY
      ================================================= */}

      <section className="section gallery-section">

        <p className="section-kicker">
          OUR MOMENTS
        </p>


        <h2 className="script-heading">
          Memories
        </h2>


        <div className="gold-line" />


        <div className="gallery-grid">

          <div className="gallery-card gallery-1">
            <img src={`${BASE_PATH}/gallery/gallery-1.png`} alt="Darshan and Yashashwini memory 1" loading="lazy" />
          </div>

          <div className="gallery-card gallery-2">
            <img src={`${BASE_PATH}/gallery/gallery-2.PNG`} alt="Darshan and Yashashwini memory 2" loading="lazy" />
          </div>

          <div className="gallery-card gallery-3">
            <img src={`${BASE_PATH}/gallery/gallery-3.png`} alt="Darshan and Yashashwini memory 3" loading="lazy" />
          </div>

          <div className="gallery-card gallery-4">
            <img src={`${BASE_PATH}/gallery/gallery-4.png`} alt="Darshan and Yashashwini memory 4" loading="lazy" />
          </div>

          <div className="gallery-card gallery-5">
            <img src={`${BASE_PATH}/gallery/gallery-5.png`} alt="Darshan and Yashashwini memory 5" loading="lazy" />
          </div>

          <div className="gallery-card gallery-6">
            <img src={`${BASE_PATH}/gallery/gallery-6.png`} alt="Darshan and Yashashwini memory 6" loading="lazy" />
          </div>

        </div>


        <p className="gallery-note">
          OUR STORY · OUR MOMENTS · OUR BEGINNING
        </p>

      </section>


      {/* =================================================
          CLOSING
      ================================================= */}

      <section className="closing-section">


        <div className="closing-flower left">
          ✿
        </div>


        <div className="closing-flower right">
          ✿
        </div>


        <div className="closing-content">


          <p className="section-kicker">
            WITH LOVE
          </p>


          <div className="heart">
            ♡
          </div>


          <p className="closing-message">

            COME, BLESS US,
            <br />

            CELEBRATE OUR LOVE,
            <br />

            AND BE A PART OF OUR FOREVER.

          </p>


          <p className="with-love">
            With Love,
          </p>


          <div className="closing-names">

            Darshan

            <span>
              &
            </span>

            Yashashwini

          </div>


          <div className="heart">
            ♡
          </div>


          <p className="closing-date">
            18 · 10 · 2026
          </p>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footer-symbol">
          ✦
        </div>


        <p>

          GOOD PEOPLE
          <br />

          GOOD BLESSINGS
          <br />

          A BEAUTIFUL TOMORROW

        </p>


        <small>
          DARSHAN & YASHASHWINI · 2026
        </small>

      </footer>


    </main>
  );
}