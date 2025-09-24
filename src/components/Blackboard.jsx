import React, { useEffect, useRef, useState } from "react";
import "./Blackboard.css";

export function Blackboard({ currentAnswer, isAnimating }) {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const writingRef = useRef(null);
  const timerRef = useRef(null);

  // Animate text (char-by-char)
  useEffect(() => {
    // clear any previous timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!currentAnswer) {
      setDisplayedText("");
      return;
    }

    if (!isAnimating) {
      // show immediately
      setDisplayedText(currentAnswer);
      return;
    }

    const lines = currentAnswer.split("\n");
    setDisplayedText("");

    let lineIndex = 0;
    let charIndex = 0;
    let animatedText = "";

    timerRef.current = setInterval(() => {
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
          animatedText =
            lines.slice(0, lineIndex).join("\n") +
            (lineIndex > 0 ? "\n" : "") +
            currentLine.slice(0, charIndex + 1);
          setDisplayedText(animatedText);
          charIndex++;
        } else {
          lineIndex++;
          charIndex = 0;
          if (lineIndex < lines.length) animatedText += "\n";
        }
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 40); // tweak typing speed here

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentAnswer, isAnimating]);

  // compute and set writing area height so it can scroll internally
  useEffect(() => {
    const updateWritingHeight = () => {
      const container = containerRef.current;
      const header = headerRef.current;
      const footer = footerRef.current;
      const writing = writingRef.current;
      if (!container || !header || !footer || !writing) return;

      const containerRect = container.getBoundingClientRect();
      const headerH = header.getBoundingClientRect().height;
      const footerH = footer.getBoundingClientRect().height;

      // account for container padding (read computed style)
      const style = getComputedStyle(container);
      const padTop = parseFloat(style.paddingTop) || 0;
      const padBottom = parseFloat(style.paddingBottom) || 0;

      const available = Math.max(
        80,
        Math.floor(containerRect.height - headerH - footerH - padTop - padBottom)
      );

      writing.style.height = `${available}px`;
    };

    updateWritingHeight();
    window.addEventListener("resize", updateWritingHeight);
    return () => window.removeEventListener("resize", updateWritingHeight);
  }, []);

  // auto-scroll to bottom when displayedText updates
  useEffect(() => {
    const writing = writingRef.current;
    if (!writing) return;

    // use requestAnimationFrame to ensure DOM updated
    requestAnimationFrame(() => {
      writing.scrollTo({ top: writing.scrollHeight, behavior: "smooth" });
    });
  }, [displayedText]);

  return (
    <div ref={containerRef} className="blackboard-container">
      {/* header */}
      <div ref={headerRef} className="blackboard-header">
        AI CLASSROOM
      </div>

      {/* writing area (height set by JS) */}
      <div ref={writingRef} className="blackboard-writing-area" role="region" aria-live="polite">
       
        {displayedText ? (
          <>
            {displayedText}
            {isAnimating && <span className="cursor" />}
          </>
        ) : (
          !isAnimating && (
            <div className="blackboard-placeholder">
              <div>Ask a question to begin your lesson...</div>
              <div style={{ fontSize: "1.8rem", marginTop: "0.5rem" }}>📚</div>
            </div>
          )
        )}
      </div>

      {/* footer / chalk */}
      <div ref={footerRef} className="chalk" />
    </div>
  );
}
