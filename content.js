async function translateToEnglish(text) {
    const response = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "no",   // Norwegian
        target: "en",   // English
        format: "text"
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.translatedText;
    } else {
      console.error("Translation failed:", await response.text());
      return null;
    }
  }
  
  function getSubtitleText() {
    const subtitleSpan = document.querySelector("span.tv-player-subtitle-text");
    if (subtitleSpan) {
      const fullText = subtitleSpan.innerText.trim(); // Better for multi-line + styled spans
      console.log("Norwegian:", fullText);
  
      translateToEnglish(fullText).then(english => {
        if (english) {
          console.log("English:", english);
        }
      });
    }
  }  
  
  const observer = new MutationObserver(() => {
    getSubtitleText();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  