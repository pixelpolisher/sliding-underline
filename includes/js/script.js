window.addEventListener('DOMContentLoaded', (e) => {
  underlineNav();
});

underlineNav = () => {
  const namespace = 'nav';
  const container = document.querySelector(`.${namespace}`);
  const menu = container.querySelector(`.${namespace}__menu`);
  const items = container.querySelectorAll(`.${namespace}__item`);
  const tracker = container.querySelector(`.${namespace}__tracker`);
  const isSearching = `${namespace}--searching`;
  const itemWidths = new Array();
  const itemOffsets = new Array();
  let activeItem = 0;

  items.forEach((item, index) => {
    const link = item.querySelector(`.${namespace}__link`);
    const text = item.querySelector(`.${namespace}__text`);
    const itemWidth = Math.round(text.offsetWidth);
    const itemOffset = Math.round(text.offsetLeft);

    itemWidths.push(itemWidth);
    itemOffsets.push(itemOffset);

    if(link.classList.contains(`${namespace}__link--here`)) {
      activeItem = index;
      tracker.setAttribute('style', `left: ${itemOffset}px; width: ${itemWidth}px`);
    }
  });

  menu.addEventListener('mouseenter', () => {
    container.classList.add(isSearching);
  });

  menu.addEventListener('mouseleave', () => {
    tracker.setAttribute('style', `left: ${itemOffsets[activeItem]}px; width: ${itemWidths[activeItem]}px`);

    setTimeout(() => {
      container.classList.remove(isSearching);
    }, 200);
  });

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      const itemWidth = itemWidths[index];
      const itemOffset = itemOffsets[index];

      tracker.setAttribute('style', `left: ${itemOffset}px; width: ${itemWidth}px`);
    });
  });
}
