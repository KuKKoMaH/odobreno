import baron from 'baron';

baron({
  root:         '.baron',
  scroller:     '.baron__scroller',
  bar:          '.baron__bar',
  scrollingCls: '_scrolling',
  draggingCls:  '_dragging',
  // $:            jQueryLike,
}).controls({
  // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
  track: '.baron__track',
});

