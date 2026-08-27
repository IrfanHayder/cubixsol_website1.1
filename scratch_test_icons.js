import { services } from './src/data/content.js';

function serializeServices(list) {
  return list.map((s) => {
    const iconObj = s.icon || {};
    return {
      title: s.title,
      displayName: iconObj.displayName,
      renderName: iconObj.render?.name,
      renderDisplayName: iconObj.render?.displayName,
      keys: Object.keys(iconObj),
      renderKeys: Object.keys(iconObj.render || {})
    };
  });
}

console.log(JSON.stringify(serializeServices(services), null, 2));
