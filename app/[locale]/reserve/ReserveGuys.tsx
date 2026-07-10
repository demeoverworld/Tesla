"use client";

import { useEffect, useRef } from "react";
import styles from "./reserve.module.css";

export function ReserveGuys() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const halfCirclePupils = root.querySelectorAll<HTMLElement>(".half-circle .pupil");
      const MAX_MOVE_HALF = 10;

      halfCirclePupils.forEach((pupil) => {
        const parent = pupil.parentElement as HTMLElement | null;

        if (!parent) {
          return;
        }

        const rect = parent.getBoundingClientRect();
        const pupilCenterX = rect.left + pupil.offsetLeft + pupil.offsetWidth / 2;
        const pupilCenterY = rect.top + pupil.offsetTop + pupil.offsetHeight / 2;
        const dx = e.clientX - pupilCenterX;
        const dy = e.clientY - pupilCenterY;
        const distance = Math.hypot(dx, dy);
        const strength = Math.min(distance / 220, 1);
        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * MAX_MOVE_HALF * strength;
        const y = Math.sin(angle) * MAX_MOVE_HALF * strength;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });

      const squareEyes = root.querySelectorAll<HTMLElement>(".square .eye");
      const MAX_MOVE_EYE = 4;
      const MAX_MOVE_PUPIL = 8;

      squareEyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const distance = Math.hypot(dx, dy);

        if (distance === 0) {
          return;
        }

        const normalizedX = dx / distance;
        const normalizedY = dy / distance;
        const strength = Math.min(distance / 260, 1);
        const moveEyeX = normalizedX * MAX_MOVE_EYE * strength;
        const moveEyeY = normalizedY * MAX_MOVE_EYE * strength;
        eye.style.transform = `translate(${moveEyeX}px, ${moveEyeY}px)`;

        const pupil = eye.querySelector<HTMLElement>(".pupil");

        if (pupil) {
          const movePupilX = normalizedX * MAX_MOVE_PUPIL * strength;
          const movePupilY = normalizedY * MAX_MOVE_PUPIL * strength;
          pupil.style.transform = `translate(calc(-50% + ${movePupilX}px), calc(-50% + ${movePupilY}px))`;
        }
      });

      const pupilsBlack = root.querySelectorAll<HTMLElement>(".pupil_black");
      const MAX_MOVE_BLACK = 4;

      pupilsBlack.forEach((pupil) => {
        const eye = pupil.parentElement as HTMLElement | null;

        if (!eye) {
          return;
        }

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const distance = Math.hypot(dx, dy);
        const strength = Math.min(distance / 220, 1);
        const angle = Math.atan2(dy, dx);
        const moveX = Math.cos(angle) * MAX_MOVE_BLACK * strength;
        const moveY = Math.sin(angle) * MAX_MOVE_BLACK * strength;

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      });

      const line = root.querySelector<HTMLElement>(".line");
      const mouth = root.querySelector<HTMLElement>(".mouth");
      const squares = root.querySelectorAll<HTMLElement>(".square");
      const circle = root.querySelector<HTMLElement>(".half-circle");
      const middle = window.innerWidth / 2;

      if (line) {
        line.style.transform = e.clientX > middle ? "rotate(90deg)" : "rotate(0deg)";
      }

      if (mouth) {
        const sideStrength = Math.min(Math.abs(e.clientX - middle) / middle, 1);
        const circleSize = 15 + sideStrength * 10;
        const smileWidth = 35 - sideStrength * 10;
        const smileHeight = 15 + sideStrength * 10;

        if (e.clientX > middle) {
          mouth.style.width = `${circleSize}px`;
          mouth.style.height = `${circleSize}px`;
          mouth.style.borderRadius = "100px";
        } else {
          mouth.style.width = `${smileWidth}px`;
          mouth.style.height = `${smileHeight}px`;
          mouth.style.borderRadius = "0 0 100px 100px";
          mouth.style.left = "43%";
          mouth.style.top = "45%";
          mouth.style.backgroundColor = "#000";
        }
      }

      squares.forEach((square) => {
        const sideStrength = Math.min(Math.abs(e.clientX - middle) / middle, 1);
        const skewDeg = sideStrength * 7;
        square.style.transform = e.clientX > middle ? `skew(-${skewDeg}deg)` : `skew(0deg)`;
      });

      if (circle) {
        const sideStrength = Math.min(Math.abs(e.clientX - middle) / middle, 1);
        const skewDeg = sideStrength * 7;
        circle.style.transform = e.clientX > middle ? `skew(-${skewDeg}deg)` : "skew(0deg)";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.guys}>
      <div className={`${styles.halfCircle} half-circle`}>
        <div className={`${styles.pupil} ${styles.left} pupil left`} />
        <div className={`${styles.pupil} ${styles.right} pupil right`} />
        <div className={`${styles.mouth} mouth`} />
      </div>

      <div className={`${styles.square} ${styles.blackSquare} square`}>
        <div className={`${styles.eye} ${styles.leftBlack} eye left_black`}>
          <div className={`${styles.pupilBlack} pupil_black`} />
        </div>
        <div className={`${styles.eye} ${styles.rightBlack} eye right_black`}>
          <div className={`${styles.pupilBlack} pupil_black`} />
        </div>
        <div className={`${styles.line} line`} />
      </div>

      <div className={`${styles.square} ${styles.redSquare} square`}>
        <div className={`${styles.eye} ${styles.left} eye left`}>
          <div className={`${styles.pupil} pupil`} />
        </div>
        <div className={`${styles.eye} ${styles.right} eye right`}>
          <div className={`${styles.pupil} pupil`} />
        </div>
      </div>
    </div>
  );
}
