'use strict';

/**
 *  category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    const res = await super.find(ctx)
    const { data, meta } = res;
    const formattedData = data.map((category) => ({ id: category.id, ...category.attributes }))
    return { data: formattedData, meta };
  }
}));
