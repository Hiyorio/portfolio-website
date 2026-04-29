const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showHeroImage": true,
  "showMarquee": true,
  "showSectionLabel": true,
  "showFooter": true,
  "gridCols": "2",
  "cardRadius": 12,
  "showCursor": true,
  "parallax": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const heroImg = document.querySelector('.hero-image-wrap');
    const marquee  = document.querySelector('.marquee-section');
    const label    = document.querySelector('.section-label');
    const footer   = document.querySelector('footer');
    const cursor   = document.getElementById('cursor');
    const projects = document.getElementById('projects');

    if (heroImg) heroImg.style.display    = tweaks.showHeroImage    ? '' : 'none';
    if (marquee)  marquee.style.display   = tweaks.showMarquee      ? '' : 'none';
    if (label)    label.style.display     = tweaks.showSectionLabel  ? '' : 'none';
    if (footer)   footer.style.display    = tweaks.showFooter        ? '' : 'none';
    if (cursor)   cursor.style.display    = tweaks.showCursor        ? '' : 'none';

    if (projects) {
      const map = { '1': '1fr', '2': '1fr 1fr', '3': '1fr 1fr 1fr' };
      projects.style.gridTemplateColumns = map[tweaks.gridCols] || '1fr 1fr';
      const wideCard = projects.querySelector('.project-card[style*="grid-column"]');
      if (wideCard) wideCard.style.gridColumn = tweaks.gridCols === '1' ? '' : '1 / -1';
    }

    document.querySelectorAll('.project-card').forEach(c => {
      c.style.borderRadius = tweaks.cardRadius + 'px';
    });

    window.__parallaxEnabled = tweaks.parallax;
  }, [tweaks]);

  return (
    <TweaksPanel>
      <TweakSection title="Блоки страницы">
        <TweakToggle label="Hero-изображение"  value={tweaks.showHeroImage}    onChange={v => setTweak('showHeroImage', v)} />
        <TweakToggle label="Бегущая строка"     value={tweaks.showMarquee}      onChange={v => setTweak('showMarquee', v)} />
        <TweakToggle label="Заголовок секции"   value={tweaks.showSectionLabel} onChange={v => setTweak('showSectionLabel', v)} />
        <TweakToggle label="Футер"              value={tweaks.showFooter}       onChange={v => setTweak('showFooter', v)} />
      </TweakSection>
      <TweakSection title="Сетка проектов">
        <TweakRadio
          label="Колонки"
          options={['1','2','3']}
          value={tweaks.gridCols}
          onChange={v => setTweak('gridCols', v)}
        />
        <TweakSlider label="Скругление карточек" min={0} max={28} step={2} value={tweaks.cardRadius} onChange={v => setTweak('cardRadius', v)} />
      </TweakSection>
      <TweakSection title="Детали">
        <TweakToggle label="Кастомный курсор" value={tweaks.showCursor} onChange={v => setTweak('showCursor', v)} />
        <TweakToggle label="Параллакс"        value={tweaks.parallax}   onChange={v => setTweak('parallax', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
