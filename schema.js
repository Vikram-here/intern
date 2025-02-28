const Joi = require("joi");
const joi=require("joi");
module.exports.listingSchema=Joi.object({
    listing:joi.object({
title:joi.string().required(),
description:joi.string().required(),
image:joi.string().allow("",null),
price:joi.string().required().min(0),
location:joi.string().required(),
country:joi.string().required(),

    }).required(),
}) ;

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
    }).required()
})