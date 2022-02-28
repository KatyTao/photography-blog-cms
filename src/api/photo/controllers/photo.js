'use strict';

/**
 *  photo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const parseAttributes = (data, keys) => {
  const initialData = data;
  keys.forEach((key) => {
    const value = initialData[key]?.data
    if (value) {
      initialData[key] = { id: value.id || null, ...value.attributes }
    }
  })
  return initialData
}
module.exports = createCoreController('api::photo.photo', ({ strapi }) => ({

  async find(ctx) {
    const res = await super.find(ctx)
    const { data, meta } = res;
    const formattedData = data.map((photo) => ({ id: photo.id, ...parseAttributes(photo.attributes, ['photo', 'category']) }))
    return { data: formattedData, meta };
  }
}));
