'use strict';

/**
 *  photo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const parseAttributes = (data, keys) => {
  const initialData = data;
  keys.forEach((key) => {
    const value = initialData[key]?.data
    if (!Array.isArray(value)) {
      initialData[key] = { id: value.id || null, ...value.attributes }
    } else {
      initialData[key] = value.map((item) => ({id: item.id || null, ...item.attributes}))
    }
  })
  return initialData
}
module.exports = createCoreController('api::photo.photo', ({ strapi }) => ({

  async find(ctx) {
    const res = await super.find(ctx)
    const { data, meta } = res;
    const formattedData = data.map((photo) => ({ id: photo.id, ...parseAttributes(photo.attributes, ['photo', 'categories']) }))
    return { data: formattedData, meta };
  }
}));
