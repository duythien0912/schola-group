const GA_TRACKING_ID = 'UA-84948227-1';
const PIXEL_TRACKING_ID = '707491726826347';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const gtagPageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
  window.fbq('track', PIXEL_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const gtagEvent = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
  window.fbq('track', action, { event_category: category, event_label: label, value: value });
};

export { GA_TRACKING_ID, PIXEL_TRACKING_ID, gtagPageview, gtagEvent };
